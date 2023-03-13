// import styles from './styles.module.scss';
import { Space } from 'antd';
import { SingleArticle } from 'entities/article';

export default function ArticleDetail() {
  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
        paddingTop: '24px',
        paddingBottom: '64px',
      }}
    >
      <SingleArticle />
    </Space>
  );
}
