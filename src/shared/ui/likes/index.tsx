import { HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './index.module.scss';

export interface LikesUIProps {
  count?: string | number;
  style?: object;
  disabled?: boolean;
}

export default function LikesUI({
  count = 12,
  style = {},
  disabled = true,
}: LikesUIProps) {
  return (
    <div className={styles.likesUI} style={style}>
      <Button
        type="text"
        size="small"
        style={{
          fontSize: '12px',
          lineHeight: '22px',
          width: '20px',
        }}
        icon={<HeartOutlined />}
        disabled={disabled}
      />
      <div>{count}</div>
    </div>
  );
}
