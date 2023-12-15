import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { AppRoutes } from '../../types/routes.ts';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../types/user.ts';

interface PrivateRouteProps {
  children: ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { authorizationStatus } = useAppSelector((state) => state.user);

  return (
    <>
      {authorizationStatus === AuthorizationStatus.Authorized && children}
      {authorizationStatus === AuthorizationStatus.Unauthorized && <Navigate to={AppRoutes.SignIn} />}
    </>
  );
}
