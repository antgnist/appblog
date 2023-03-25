import styles from './index.module.scss';

export interface TittleUIProp {
  tittle?: string;
  style?: object;
}

function TittleUI({ tittle = '', style = {} }: TittleUIProp) {
  if (!tittle) return null;

  return (
    <div className={styles.tittleUI} style={style}>
      {tittle}
    </div>
  );
}

export default TittleUI;
