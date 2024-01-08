import { render, screen } from '@testing-library/react';
import { withProviders } from '../../../utils/mock-component.tsx';
import { AuthorizationStatus } from '../../../types/user.ts';
import AddReviewLink from './index.tsx';
import * as faker from 'faker';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '../../../types/routes.ts';

describe('Component: AddReviewLink', () => {
  const mockFilmId = faker.datatype.uuid();

  it('should redirect to add review-block page for authorized users', async () => {
    const { component, mockHistory } = withProviders(<AddReviewLink id={mockFilmId} />, {
      user: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    render(component);
    const link = screen.getByRole('link', {name: /add review/i});
    expect(link).toBeInTheDocument();
    await userEvent.click(link);
    expect(mockHistory.location.pathname).toBe(AppRoutes.AddReview.replace(':id', mockFilmId));
  });

  it('should not render link for guests', () => {
    const { component } = withProviders(<AddReviewLink id={mockFilmId} />, {
      user: {
        authorizationStatus: AuthorizationStatus.Unauthorized,
      },
    });

    render(component);
    expect(screen.queryByRole('link', {name: /add review/i})).not.toBeInTheDocument();
  });
});
