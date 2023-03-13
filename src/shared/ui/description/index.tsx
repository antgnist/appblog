import styles from './index.module.scss';

export interface DescriptionUIProp {
  description?: string;
  style?: object;
}

function DescriptionUI({ description = '', style = {} }: DescriptionUIProp) {
  if (!description) return null;

  return (
    <p className={styles.descriptionUI} style={style}>
      {description}
    </p>
  );
}

export default DescriptionUI;
