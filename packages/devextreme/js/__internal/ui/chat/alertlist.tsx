import messageLocalization from '@js/common/core/localization/message';
import type {
  Alert,
} from '@js/ui/chat';
import { Component } from 'inferno';

const CHAT_ALERTLIST_CLASS = 'dx-chat-alertlist';
const CHAT_ALERTLIST_ERROR_CLASS = 'dx-chat-alertlist-error';
const CHAT_ALERTLIST_ERROR_ICON_CLASS = 'dx-chat-alertlist-error-icon';
const CHAT_ALERTLIST_ERROR_TEXT_CLASS = 'dx-chat-alertlist-error-text';

export interface Properties {
  items: Alert[];
}

class AlertList extends Component<Properties> {
  public render(): JSX.Element {
    return (
      <div
        className={CHAT_ALERTLIST_CLASS}
        role='log'
        aria-atomic='false'
        aria-label={messageLocalization.format('dxChat-alertListAriaLabel')}
        aria-live='polite'
        aria-relevant='additions'
      >
        {this.props.items.map((item) => (
          <div className={CHAT_ALERTLIST_ERROR_CLASS}>
            <div className={CHAT_ALERTLIST_ERROR_ICON_CLASS}/>
            <div className={CHAT_ALERTLIST_ERROR_TEXT_CLASS}>
              {item?.message ?? ''}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AlertList;
