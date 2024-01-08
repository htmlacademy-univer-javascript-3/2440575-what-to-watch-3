import { render, screen } from '@testing-library/react';
import { withProviders } from '../../../utils/mock-component.tsx';
import { AuthorizationStatus } from '../../../types/user.ts';
import AddReviewLink from './index.tsx';
import * as faker from 'faker';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '../../../types/routes.ts';

describe('Component: AddReviewLink', () => {
  const mockedFilmId = faker.datatype.uuid();

  it('should redirect to add review-block page for authorized users', async () => {
    const { component, history } = withProviders(<AddReviewLink id={mockedFilmId} />, {
      user: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    render(component);
    const link = screen.getByRole('link', {name: /add review/i});
    expect(link).toBeInTheDocument();
    await userEvent.click(link);
    expect(history.location.pathname).toBe(AppRoutes.AddReview.replace(':id', mockedFilmId));
  });

  it('should not render link for guests', () => {
    const { component } = withProviders(<AddReviewLink id={mockedFilmId} />, {
      user: {
        authorizationStatus: AuthorizationStatus.Unauthorized,
      },
    });

    render(component);
    expect(screen.queryByRole('link', {name: /add review/i})).not.toBeInTheDocument();
  });
});
