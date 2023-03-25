import { userModel } from 'entities/user';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks';
import { ButtonUI } from 'shared/ui';
import { clearTokenLocalStorage } from 'shared/utils/token-local-storage';
import styles from './index.module.scss';

export type LogoutButtonProps = {
  style?: object;
  className?: string;
};

export function LogoutButton({
  style = {},
  className = '',
}: LogoutButtonProps) {
  const { logout } = userModel;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    clearTokenLocalStorage();
    navigate('/');
  };

  return (
    <ButtonUI
      className={`${styles.logoutButton} ${className}`}
      action={handleLogout}
      size="large"
      style={{ height: '46px', fontSize: 'var(--font-size-h6)', ...style }}
    >
      Log Out
    </ButtonUI>
  );
}
