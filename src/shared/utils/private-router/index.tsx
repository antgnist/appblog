import { userModel } from 'entities/user';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks';

function PrivateRoutes() {
  const user = useAppSelector(userModel.selectUser);
  return user.loggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

export default PrivateRoutes;
