import { render, screen } from '@testing-library/react';
import PrivateRoute from './index.tsx';
import { withProviders } from '../../utils/mock-component.tsx';
import { AuthorizationStatus } from '../../types/user.ts';
import { expect } from 'vitest';
import { AppRoutes } from '../../types/routes.ts';

describe('Component: PrivateRoute', () => {
  it('should render children when the user is authorized', () => {
    const { component } = withProviders(
      <PrivateRoute>
        <span>Example Child</span>
      </PrivateRoute>,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Authorized,
        }
      }
    );
    render(component);
    expect(screen.getByText(/example child/i)).toBeInTheDocument();
  });

  it('should redirect to sign in page when the user is unauthorized', () => {
    const { component, mockHistory } = withProviders(
      <PrivateRoute>
        <span>Example Child</span>
      </PrivateRoute>,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Unauthorized,
        }
      }
    );
    render(component);
    expect(mockHistory.location.pathname).toBe(AppRoutes.SignIn);
    expect(screen.queryByText(/example child/i)).not.toBeInTheDocument();
  });
});
