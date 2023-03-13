import format from 'date-fns/format';
import styles from './index.module.scss';

export interface DateUIProp {
  strDate?: string;
}

function DateUI({ strDate = '' }: DateUIProp) {
  if (!strDate) return null;

  let date;
  try {
    date = format(Date.parse(strDate), 'MMMM d, yyyy');
  } catch (error) {
    date = null;
  }

  return <div className={styles.dateUI}>{date}</div>;
}

export default DateUI;
