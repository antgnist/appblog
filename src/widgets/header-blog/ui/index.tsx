import { ButtonUI } from 'shared/ui';
import styles from './styles.module.scss';

function Logo() {
  return <div>Realworld Blog</div>;
}

function HeaderBlog() {
  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.header__control}>
        <ButtonUI type="text" action={() => {}}>
          Sign In
        </ButtonUI>
        <ButtonUI
          style={{
            color: 'var(--color-success)',
            backgroundColor: 'var(--color-btn-primary)',
            border: '1px solid',
          }}
          type="primary"
          action={() => {}}
        >
          Sign Up
        </ButtonUI>
      </div>
    </div>
  );
}

export default HeaderBlog;
