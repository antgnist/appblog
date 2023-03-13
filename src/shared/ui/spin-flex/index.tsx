import { Spin } from 'antd';

export interface SpinFlexUIProp {
  delay?: number;
  className?: string;
  size?: 'large' | 'small' | 'default' | undefined;
}

function SpinFlexUI({
  delay = 300,
  className = 'overlay',
  size = 'large',
}: SpinFlexUIProp) {
  return (
    <Spin
      style={{
        position: 'initial',
        flexGrow: '3',
        backgroundColor: 'var(--color-bg)',
      }}
      delay={delay}
      className={className}
      size={size}
    />
  );
}

export default SpinFlexUI;
