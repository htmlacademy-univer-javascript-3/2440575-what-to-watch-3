import Footer from '../../components/footer';
import Header from '../../components/header';
import SignInForm from './sign-in-form';

export default function SignIn() {
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
