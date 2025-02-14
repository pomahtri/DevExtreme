import type { Format } from '@js/common/core/localization';
import dateLocalization from '@js/common/core/localization/date';
import messageLocalization from '@js/common/core/localization/message';
import dateSerialization from '@js/core/utils/date_serialization';
import { isDate } from '@js/core/utils/type';
import type { Message } from '@js/ui/chat';
import { Component } from 'inferno';

import Avatar from './avatar';
import MessageBubble from './messagebubble';
import type { MessageTemplate } from './messagelist';

export const CHAT_MESSAGEGROUP_CLASS = 'dx-chat-messagegroup';
export const CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS = 'dx-chat-messagegroup-alignment-start';
export const CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS = 'dx-chat-messagegroup-alignment-end';
const CHAT_MESSAGEGROUP_INFORMATION_CLASS = 'dx-chat-messagegroup-information';
const CHAT_MESSAGEGROUP_TIME_CLASS = 'dx-chat-messagegroup-time';
const CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS = 'dx-chat-messagegroup-author-name';
const CHAT_MESSAGEGROUP_CONTENT_CLASS = 'dx-chat-messagegroup-content';

export type MessageGroupAlignment = 'start' | 'end';

export interface Properties {
  items: Message[];
  alignment: MessageGroupAlignment;
  showAvatar: boolean;
  showUserName: boolean;
  showMessageTimestamp: boolean;
  messageTemplate?: MessageTemplate;
  messageTimestampFormat?: Format;
}

class MessageGroup extends Component<Properties> {
  private shouldAddTimeValue(timestamp: Date | string | number | undefined): boolean {
    const deserializedDate = dateSerialization.deserializeDate(timestamp);

    return isDate(deserializedDate) && !isNaN(deserializedDate.getTime());
  }

  private getTimeValue(timestamp: Date | string | number | undefined): string {
    const deserializedDate = dateSerialization.deserializeDate(timestamp);

    const { messageTimestampFormat } = this.props;
    const formattedTime = dateLocalization.format(deserializedDate, messageTimestampFormat);

    return formattedTime as string;
  }

  public render(): JSX.Element {
    const {
      alignment, items, showAvatar, showUserName, showMessageTimestamp, messageTemplate,
    } = this.props;

    const alignmentClass = alignment === 'start'
      ? CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS
      : CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS;

    return (
      <div className={`${CHAT_MESSAGEGROUP_CLASS} ${alignmentClass}`}>
        {items.length > 0 && <>
          {showAvatar && alignment === 'start' && (
            <Avatar
              name={items[0].author?.name}
              url={items[0].author?.avatarUrl}
              alt={items[0].author?.avatarAlt}
            />
          )}
          <div className={CHAT_MESSAGEGROUP_INFORMATION_CLASS}>
            {showUserName && (
              <div className={CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS}>
                {
                  alignment === 'start'
                    ? items[0].author?.name ?? messageLocalization.format('dxChat-defaultUserName')
                    : ''
                }
              </div>
            )}
            {showMessageTimestamp && (
              <div className={CHAT_MESSAGEGROUP_TIME_CLASS}>
                {this.shouldAddTimeValue(items[0].timestamp)
                  && this.getTimeValue(items[0].timestamp)
                }
              </div>
            )}
          </div>
          <div className={CHAT_MESSAGEGROUP_CONTENT_CLASS}>
            {items.map((message) => (
              <MessageBubble
                text={message.text}
                template={messageTemplate
                  ? (text, container): void => {
                    messageTemplate({ ...message, text }, container);
                  }
                  : undefined
                }
              />
            ))}
          </div>
        </>}
      </div>
    );
  }
}

export default MessageGroup;
