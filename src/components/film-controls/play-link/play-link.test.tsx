import { render, screen } from '@testing-library/react';
import { withProviders } from '../../../utils/mock-component.tsx';
import { AuthorizationStatus } from '../../../types/user.ts';
import AddReviewLink from './index.tsx';
import * as faker from 'faker';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '../../../types/routes.ts';

describe('Component: PlayLink', () => {
  const mockedFilmId = faker.datatype.uuid();

  it('should redirect to video player page', async () => {
    const { component, history } = withProviders(<AddReviewLink id={mockedFilmId} />, {
      user: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    render(component);
    const link = screen.getByRole('link', {name: /play/i});
    expect(link).toBeInTheDocument();
    await userEvent.click(link);
    expect(history.location.pathname).toBe(AppRoutes.Player.replace(':id', mockedFilmId));
  });
});
