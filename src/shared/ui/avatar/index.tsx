import Avatar from 'antd/es/avatar/avatar';
import noAva from './noAva.svg';

export interface AvatarUIPprop {
  src: string;
  size?: 'default' | 'large' | 'small' | number;
}

function AvatarUI({ src, size = 46 }: AvatarUIPprop) {
  const avatarSrc = src || noAva;
  return <Avatar size={size} src={avatarSrc} />;
}

export default AvatarUI;
