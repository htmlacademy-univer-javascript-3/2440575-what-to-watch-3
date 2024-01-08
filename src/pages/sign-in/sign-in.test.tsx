import { render, screen } from '@testing-library/react';
import SignIn from './index.tsx';
import { withProviders } from '../../utils/mock-component.tsx';
import { AuthorizationStatus } from '../../types/user.ts';
import { AppRoutes } from '../../types/routes.ts';

describe('Component: SignIn', () => {
  it('should render correctly', () => {
    const {component} = withProviders(<SignIn />);
    render(component);
    expect(screen.getByRole('heading', {name: /sign in/i})).toBeInTheDocument();
  });

  it('should redirect to the main page when user is unauthorized', () => {
    const {component, history} = withProviders(<SignIn />, {
      user: {
        authorizationStatus: AuthorizationStatus.Authorized
      }
    });
    render(component);
    expect(history.location.pathname).toBe(AppRoutes.Main);
  });
});
