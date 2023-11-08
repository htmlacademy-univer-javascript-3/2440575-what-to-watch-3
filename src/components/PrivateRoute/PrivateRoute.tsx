import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../config/config';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}
const PrivateRoute = ({authStatus, children}: PrivateRouteProps) => (
  authStatus === AuthStatus.Auth
    ? children
    : <Navigate to={AppRoute.SignIn}></Navigate>
);

export default PrivateRoute;
