import Footer from '../../components/footer';
import Header from '../../components/header';
import SignInForm from './sign-in-form';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../types/user.ts';
import { AppRoutes } from '../../types/routes.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

export default function SignIn() {
  const navigate = useNavigate();
  const { authorizationStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      navigate(AppRoutes.Main);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="user-page">
      <Header className="user-page__head">
        <Header.Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <SignInForm />
      </div>
      <Footer />
    </div>
  );
}
