import { getPublicElement } from '@js/core/element';
import $ from '@js/core/renderer';
import { Component, createRef } from 'inferno';

export const CHAT_MESSAGEBUBBLE_CLASS = 'dx-chat-messagebubble';
const CHAT_MESSAGEBUBBLE_CONTENT_CLASS = 'dx-chat-messagebubble-content';

export interface Properties {
  text?: string;
  template?: ((text: string, container: Element) => void) | null;
}

class MessageBubble extends Component<Properties> {
  private readonly ref = createRef<HTMLDivElement>();

  public render(): JSX.Element {
    return (
      <div className={CHAT_MESSAGEBUBBLE_CLASS}>
        <div ref={this.ref} className={CHAT_MESSAGEBUBBLE_CONTENT_CLASS}>
          {!this.props.template && this.props.text}
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    // TODO
    const { template, text = '' } = this.props;
    if (template) {
      // @ts-expect-error
      template(text, getPublicElement($(this.ref.current)));
    }
  }
}

export default MessageBubble;
