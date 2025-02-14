import type { NativeEventInfo } from '@js/common/core/events';
import messageLocalization from '@js/common/core/localization/message';
import $ from '@js/core/renderer';
import type { ClickEvent } from '@js/ui/button';
import type { OptionChanged } from '@ts/core/widget/types';
import { TextArea } from '@ts/grids/new/grid_core/inferno_wrappers/textarea';
import { Component } from 'inferno';

import type { EnterKeyEvent, InputEvent } from '../../../ui/text_area';
import type dxTextArea from '../../../ui/text_area';
import { Button } from '@ts/grids/new/grid_core/inferno_wrappers/button';

const CHAT_MESSAGEBOX_CLASS = 'dx-chat-messagebox';
const CHAT_MESSAGEBOX_TEXTAREA_CLASS = 'dx-chat-messagebox-textarea';
const CHAT_MESSAGEBOX_BUTTON_CLASS = 'dx-chat-messagebox-button';

export const TYPING_END_DELAY = 2000;

export type MessageEnteredEvent =
  NativeEventInfo<MessageBox, KeyboardEvent | PointerEvent | MouseEvent | TouchEvent> &
  { text?: string };

export type TypingStartEvent = NativeEventInfo<MessageBox, UIEvent & { target: HTMLInputElement }>;

export interface Properties {
  activeStateEnabled?: boolean;

  focusStateEnabled?: boolean;

  hoverStateEnabled?: boolean;

  onMessageEntered?: (e: MessageEnteredEvent) => void;

  onTypingStart?: (e: TypingStartEvent) => void;

  onTypingEnd?: (e: NativeEventInfo<MessageBox>) => void;

  emptyViewId?: string;
}

interface State {
  buttonDisabled: boolean;

  text: string;
}

class MessageBox extends Component<Properties, State> {
  state = {
    buttonDisabled: true,
    text: '',
  }

  // eslint-disable-next-line no-restricted-globals
  _typingEndTimeoutId?: ReturnType<typeof setTimeout> | undefined;

  public render(): JSX.Element {
    return (
      <div className={CHAT_MESSAGEBOX_CLASS}>
        <TextArea
          className={CHAT_MESSAGEBOX_TEXTAREA_CLASS}
          activeStateEnabled={this.props.activeStateEnabled}
          focusStateEnabled={this.props.focusStateEnabled}
          hoverStateEnabled={this.props.hoverStateEnabled}
          stylingMode='outlined'
          placeholder={messageLocalization.format('dxChat-textareaPlaceholder')}
          autoResizeEnabled={true}
          valueChangeEvent='input'
          maxHeight='8em'
          inputAttr={{
            'aria-labelledby': this.props.emptyViewId,
          }}
          text={this.state.text}
          onInput={(e): void => {
            const text = e.component.option('text') ?? '';
            const shouldButtonBeDisabled = !text.trim();

            this.setState({
              text,
              buttonDisabled: shouldButtonBeDisabled
            });

            // TODO
            // @ts-expect-error
            this._triggerTypingStartAction(e);
            this._updateTypingEndTimeout();
          }}
          onEnterKey={(e: EnterKeyEvent): void => {
            // TODO
            if (!e.event?.shiftKey && !this.state.text.trim()) {
              e.event?.preventDefault();
            }

            if (!e.event?.shiftKey) {
              this._sendHandler(e);
            }
          }}
        />
        <Button
          className={CHAT_MESSAGEBOX_BUTTON_CLASS}
          activeStateEnabled={this.props.activeStateEnabled}
          focusStateEnabled={this.props.focusStateEnabled}
          hoverStateEnabled={this.props.hoverStateEnabled}
          icon='sendfilled'
          type='default'
          stylingMode='text'
          disabled={this.state.buttonDisabled}
          elementAttr={{
            'aria-label': messageLocalization.format('dxChat-sendButtonAriaLabel')

          }}
          onClick={(e) => {
            this._sendHandler(e);
          }}
        />
      </div>
    );
  }

  _triggerTypingStartAction(e: InputEvent): void {
    if (!this._typingEndTimeoutId) {
      this.props.onTypingStart?.();
    }
  }

  _updateTypingEndTimeout(): void {
    clearTimeout(this._typingEndTimeoutId);

    // eslint-disable-next-line no-restricted-globals
    this._typingEndTimeoutId = setTimeout(() => {
      this._typingEndAction?.();

      this._clearTypingEndTimeout();
    }, TYPING_END_DELAY);
  }

  _clearTypingEndTimeout(): void {
    clearTimeout(this._typingEndTimeoutId);

    this._typingEndTimeoutId = undefined;
  }

  _sendHandler(e: ClickEvent | EnterKeyEvent): void {
    this._clearTypingEndTimeout();
    this._typingEndAction?.();
    
    this._messageEnteredAction?.({ text: this.state.text, event: e.event });

    this.setState({
      text: '',
      buttonDisabled: true
    });
  }

  componentWillUnmount(): void {
    this._clearTypingEndTimeout();
  }
}

export default MessageBox;
