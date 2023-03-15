import styles from './index.module.scss';

export interface FormTitleUIProp {
  tittle?: string;
}

function FormTitleUI({ tittle = '' }: FormTitleUIProp) {
  if (!tittle) return null;

  return (
    <div
      className={styles.formTitleUI}
      style={{ fontFamily: 'Roboto', fontWeight: '500' }}
    >
      {tittle}
    </div>
  );
}

export default FormTitleUI;
