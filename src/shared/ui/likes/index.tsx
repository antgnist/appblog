import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './index.module.scss';

export interface LikesUIProps {
  count?: string | number;
  style?: object;
  disabled?: boolean;
  liked?: boolean;
  action?: () => void;
}

export default function LikesUI({
  count = 0,
  style = {},
  disabled = true,
  liked = false,
  action = () => {},
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
        icon={
          liked ? (
            // <HeartOutlined style={{ color: 'red' }} />
            <HeartFilled style={{ color: 'red' }} />
          ) : (
            <HeartOutlined style={{}} />
          )
        }
        disabled={disabled}
        onClick={() => {
          action();
        }}
      />
      <div>{count}</div>
    </div>
  );
}
