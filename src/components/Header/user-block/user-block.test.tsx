import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withProviders } from '../../../utils/mock-component.tsx';
import { AppRoutes } from '../../../types/routes.ts';
import { mockUserDetails } from '../../../utils/mock-data.ts';
import UserBlock from './index.tsx';
import { AuthorizationStatus } from '../../../types/user.ts';
import { extractActionsTypes } from '../../../utils/mock-reducer.ts';
import { signOut } from '../../../store/api-actions.ts';
import { expect } from 'vitest';

describe('Component: UserBlock', () => {
  const mockedUserDetails = mockUserDetails();

  it('should display sign in link for guests', async () => {
    const { component, history } = withProviders(<UserBlock />,
      {
        user: {
          ...mockedUserDetails,
          authorizationStatus: AuthorizationStatus.Unauthorized,
        }
      });
    render(component);
    const link = screen.getByRole('link', { name: /sign in/i });
    expect(link).toBeInTheDocument();
    await userEvent.click(link);
    expect(history.location.pathname).toBe(AppRoutes.SignIn);
  });

  it('should display sign out button for authorized users', async () => {
    const { component, mockStore, mockAxiosAdapter } = withProviders(<UserBlock />,
      {
        user: {
          ...mockedUserDetails,
          authorizationStatus: AuthorizationStatus.Authorized,
        }
      });
    mockAxiosAdapter.onDelete(/\/logout/).reply(200);
    render(component);

    const signOutElement = screen.getByText(/sign out/i);
    expect(signOutElement).toBeInTheDocument();
    await userEvent.click(signOutElement);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      signOut.pending.type,
      signOut.fulfilled.type,
    ]);
  });

  it('should display avatar for authorized users', async () => {
    const { component, history } = withProviders(<UserBlock />,
      {
        user: {
          ...mockedUserDetails,
          authorizationStatus: AuthorizationStatus.Authorized,
        }
      });
    render(component);

    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
    await userEvent.click(avatar);
    expect(history.location.pathname).toBe(AppRoutes.MyList);
  });
});
