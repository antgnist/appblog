import styles from './index.module.scss';

export interface TittleUIProp {
  tittle?: string;
}

function TittleUI({ tittle = '' }: TittleUIProp) {
  if (!tittle) return null;

  return <div className={styles.tittleUI}>{tittle}</div>;
}

export default TittleUI;
