import messageLocalization from '@js/common/core/localization/message';
import { Component } from 'inferno';

const AVATAR_CLASS = 'dx-avatar';
const AVATAR_INITIALS_CLASS = 'dx-avatar-initials';
const AVATAR_IMAGE_CLASS = 'dx-avatar-image';

function getFirstChar(value: string | undefined): string {
  return value?.charAt(0).toUpperCase() ?? '';
}

function getInitials(name: string): string {
  const splitValue = String(name).trim().split(/\s+/);

  const firstInitial = getFirstChar(splitValue[0]);
  const secondInitial = getFirstChar(splitValue[1]);

  const result = `${firstInitial}${secondInitial}`;

  return result;
}

export interface Properties {
  name?: string;
  url?: string;
  alt?: string;
}

class Avatar extends Component<Properties> {
  render(): JSX.Element {
    const altText = this.props.alt ?? this.props.name ?? messageLocalization.format('dxAvatar-defaultImageAlt');

    return (
      <div className={AVATAR_CLASS}>
        {this.props.url?.trim?.() ? (
          <img
            className={AVATAR_IMAGE_CLASS}
            src={this.props.url}
            alt={altText}
          />
        ) : (
          <div className={AVATAR_INITIALS_CLASS}>
            {getInitials(this.props.name ?? 'Unknown User')}
          </div>
        )}
      </div>
    );
  }
}

export default Avatar;
