import messageLocalization from '@js/common/core/localization/message';
import type { User } from '@js/ui/chat';
import { Component } from 'inferno';

const CHAT_TYPINGINDICATOR_CLASS = 'dx-chat-typingindicator';
const CHAT_TYPINGINDICATOR_CONTENT_CLASS = 'dx-chat-typingindicator-content';
const CHAT_TYPINGINDICATOR_TEXT_CLASS = 'dx-chat-typingindicator-text';
const CHAT_TYPINGINDICATOR_BUBBLE_CLASS = 'dx-chat-typingindicator-bubble';
const CHAT_TYPINGINDICATOR_CIRCLE_CLASS = 'dx-chat-typingindicator-circle';

function getText(typingUsers: User[]): string {
  const usernames = typingUsers?.map((user) => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const name = user.name?.trim() || messageLocalization.format('dxChat-defaultUserName');

    return name;
  });

  if (usernames?.length === 1) {
    const username = usernames[0];

    return messageLocalization.format(
      'dxChat-typingMessageSingleUser',
      // @ts-expect-error
      username,
    );
  }

  if (usernames?.length === 2) {
    const [usernameFirst, usernameSecond] = usernames;

    return messageLocalization.format(
      'dxChat-typingMessageTwoUsers',
      // @ts-expect-error
      usernameFirst,
      usernameSecond,
    );
  }

  if (usernames?.length === 3) {
    const [
      usernameFirst,
      usernameSecond,
      usernameThird,
    ] = usernames;

    return messageLocalization.format(
      'dxChat-typingMessageThreeUsers',
      // @ts-expect-error
      usernameFirst,
      usernameSecond,
      usernameThird,
    );
  }

  const usernameString = usernames.slice(0, 3).join(', ');

  return messageLocalization.format(
    'dxChat-typingMessageMultipleUsers',
    // @ts-expect-error
    usernameString,
  );
}


export interface Properties {
  typingUsers: User[];
}

export class TypingIndicator extends Component<Properties> {

  public render(): JSX.Element {
    return (
      <div className={CHAT_TYPINGINDICATOR_CLASS}>
        <div className={CHAT_TYPINGINDICATOR_CONTENT_CLASS}>
          <div className={CHAT_TYPINGINDICATOR_TEXT_CLASS}>
            {getText(this.props.typingUsers)}
          </div>
          <div className={CHAT_TYPINGINDICATOR_BUBBLE_CLASS}>
            {
              new Array(3).fill(0).map(() => (
                <div className={CHAT_TYPINGINDICATOR_CIRCLE_CLASS}/>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TypingIndicator;
