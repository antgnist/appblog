import { Button } from 'antd';
import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface ButtonUIProp {
  type?:
    | 'link'
    | 'text'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined;
  className?: string;
  style?: object;
  size?: undefined | 'large' | 'small' | 'middle';
  href?: string;
  disabled?: boolean;
  action: () => any;
}

function ButtonUI({
  children = null,
  type = undefined,
  className = '',
  style = {},
  action,
  size = 'middle',
  disabled = false,
  ...args
}: PropsWithChildren<ButtonUIProp>) {
  return (
    <Button
      type={type}
      className={`${className} ${styles.buttonUI}`}
      style={style}
      onClick={action}
      size={size}
      disabled={disabled}
      {...args}
    >
      {children}
    </Button>
  );
}

export default ButtonUI;
