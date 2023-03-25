import Avatar from 'antd/es/avatar/avatar';
import noAva from './noAva.svg';

export interface AvatarUIPprop {
  src: string;
  size?: 'default' | 'large' | 'small' | number;
}

function AvatarUI({ src, size = 46 }: AvatarUIPprop) {
  const avatarSrc = src || noAva;
  return (
    // <div style={{ minWidth: `${size}px` }}>
    <Avatar
      alt="A"
      size={size}
      src={avatarSrc}
      icon={<img src={noAva} alt="noAva" />}
      style={{ minWidth: `${size}px` }}
    />
    // </div>
  );
}

export default AvatarUI;
