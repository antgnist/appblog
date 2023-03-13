import { Pagination } from 'antd';

import styles from './index.module.scss';

export interface PaginationUIProprs {
  current: number;
  total: number;
  chgArticlesPage: (a: number) => void;
}

function PaginationUI({
  current,
  total = 5,
  chgArticlesPage,
}: PaginationUIProprs) {
  const onChangeHandler = (page: number) => {
    chgArticlesPage(page);
  };
  return (
    <div>
      <Pagination
        // defaultCurrent={1}
        current={current}
        total={total}
        size="small"
        defaultPageSize={5}
        className={styles.paginationUI}
        onChange={(page) => {
          onChangeHandler(page);
        }}
      />
    </div>
  );
}

export default PaginationUI;
