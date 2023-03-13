import styles from './index.module.scss';

export interface FullNameUIProp {
  fullName?: string;
}

function FullNameUI({ fullName = '' }: FullNameUIProp) {
  if (!fullName) return null;

  return <div className={styles.fullNameUI}>{fullName}</div>;
}

export default FullNameUI;
