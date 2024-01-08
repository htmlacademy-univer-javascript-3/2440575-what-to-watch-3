import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import AddReviewForm from './index.tsx';
import { withProviders } from '../../../utils/mock-component.tsx';
import { ReviewFormLimitations } from '../../../types/review.ts';
import userEvent from '@testing-library/user-event';
import { mockFilmDetails, mockReview } from '../../../utils/mock-data.ts';
import { extractActionsTypes } from '../../../utils/mock-reducer.ts';
import { StatusCodes } from 'http-status-codes';
import { addReview } from '../../../store/api-actions.ts';
import { AppRoutes } from '../../../types/routes.ts';
import { Route, Routes } from 'react-router-dom';

describe('Component: AddReviewForm', () => {
  const mockReviewData = mockReview();
  const mockFilm = mockFilmDetails();

  it('should render correctly', () => {
    const { component } = withProviders(<AddReviewForm />);
    render(component);
    expect(screen.getByPlaceholderText(/review text/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/rating/i).length).toBe(ReviewFormLimitations.MaxRating);
    expect(screen.getByRole('button', { name: /post/i })).toBeDisabled();
  });

  it('should submit review', async () => {
    const { component, mockStore, mockHistory, mockAxiosAdapter } = withProviders(
      <Routes>
        <Route path={AppRoutes.AddReview} element={<AddReviewForm />} />
        <Route path={AppRoutes.Film} element={<AddReviewForm />} />
      </Routes>
    );
    mockAxiosAdapter.onPost(/\/comments/).reply(StatusCodes.OK);
    mockHistory.push(AppRoutes.AddReview.replace(':id', mockFilm.id));
    render(component);
    await userEvent.click(screen.getAllByLabelText(/rating/i)[0]);
    await userEvent.type(screen.getByPlaceholderText(/review text/i), mockReviewData.comment);
    await waitFor(() => expect(screen.getByRole('button', { name: /post/i })).toBeEnabled());
    await userEvent.click(screen.getByRole('button', { name: /post/i }));
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      addReview.pending.type,
      addReview.fulfilled.type,
    ]));
    expect(mockHistory.location.pathname).toBe(AppRoutes.Film.replace(':id', mockFilm.id));
  });

  it('should validate review comment min length', async () => {
    const { component } = withProviders(<AddReviewForm />);
    render(component);
    await userEvent.click(screen.getAllByLabelText(/rating/i)[0]);
    expect(screen.getByRole('button', { name: /post/i })).toBeDisabled();
  });

  it('should validate review comment max length', async () => {
    const mockRepeatCount = 10;
    const { component } = withProviders(<AddReviewForm />);
    render(component);
    await userEvent.click(screen.getAllByLabelText(/rating/i)[0]);
    await userEvent.type(screen.getByPlaceholderText(/review text/i), mockReviewData.comment.repeat(mockRepeatCount));
    expect(screen.getByRole('button', { name: /post/i })).toBeDisabled();
  });

  it('should validate review rating', async () => {
    const { component } = withProviders(<AddReviewForm />);
    render(component);
    await userEvent.type(screen.getByPlaceholderText(/review text/i), mockReviewData.comment);
    expect(screen.getByRole('button', { name: /post/i })).toBeDisabled();
  });
});
