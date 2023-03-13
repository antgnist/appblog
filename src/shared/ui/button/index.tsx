import { Button } from 'antd';
import { PropsWithChildren } from 'react';

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
  action: () => any;
}

function ButtonUI({
  children = null,
  type = undefined,
  className = '',
  style = {},
  action,
}: PropsWithChildren<ButtonUIProp>) {
  return (
    <Button type={type} className={className} style={style} onClick={action}>
      {children}
    </Button>
  );
}

export default ButtonUI;
