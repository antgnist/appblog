import { userModel } from 'entities/user';
import { LogoutButton } from 'features/logout-button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks';
import { ButtonUI, AvatarUI, FullNameUI } from 'shared/ui';
import styles from './styles.module.scss';

type HeaderBlogProps = {
  auth: boolean;
};

function Logo() {
  return (
    <Link to="/" relative="route" className={styles.header__logo}>
      <div>Realworld Blog</div>
    </Link>
  );
}

function HeaderBlog({ auth }: HeaderBlogProps) {
  const navigate = useNavigate();
  const { image, username } = useAppSelector(userModel.selectUser);

  const authBody = (
    <div className={styles.header__control__auth}>
      <ButtonUI
        className={styles.header__createArticleBtn}
        action={() => {
          navigate('/new-article');
        }}
      >
        Create article
      </ButtonUI>

      <Link
        to="profile"
        relative="route"
        style={{ display: 'flex', alignItems: 'center', gap: '13px' }}
      >
        <FullNameUI fullName={username} />
        <AvatarUI src={image} />
      </Link>
      <LogoutButton />
    </div>
  );

  const noAuthBody = (
    <div className={styles.header__control__noauth}>
      <ButtonUI
        className={styles.header__signInBtn}
        type="text"
        action={() => {
          navigate('/sign-in');
        }}
      >
        Sign In
      </ButtonUI>

      <ButtonUI
        className={styles.header__signUpBtn}
        action={() => {
          navigate('/sign-up');
        }}
      >
        Sign Up
      </ButtonUI>
    </div>
  );

  return (
    <div className={styles.header}>
      <Logo />
      {auth ? authBody : noAuthBody}
    </div>
  );
}

export default HeaderBlog;
