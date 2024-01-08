import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { mockFilmArray, mockReviewArray, mockUserDetails } from '../../utils/mock-data.ts';
import { withProviders } from '../../utils/mock-component.tsx';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import {
  loadFavoriteFilms,
  loadFilmDetails,
  loadReviews,
  loadSuggestions
} from '../../store/api-actions.ts';
import { AuthorizationStatus } from '../../types/user.ts';
import Film from './index.tsx';

describe('Component: Film', () => {
  const mockedFilteredFilms = mockFilmArray();
  const mockedReviews = mockReviewArray();
  const mockedUserDetails = mockUserDetails();

  it('should render correctly and load data', async () => {
    const { component, mockStore, mockAxiosAdapter } = withProviders(<Film />, {
      user: {
        ...mockedUserDetails,
        authorizationStatus: AuthorizationStatus.Authorized,
      },
      film: {
        suggestionPortion: mockedFilteredFilms.slice(1),
        selectedFilm: mockedFilteredFilms[0],
        favoriteFilms: mockedFilteredFilms,
      },
      review: {
        reviews: mockedReviews,
      }
    });
    mockAxiosAdapter.onGet(/\/favorite/).reply(200, mockedFilteredFilms);
    mockAxiosAdapter.onGet(/\/comments/).reply(200, mockedReviews);
    mockAxiosAdapter.onGet(/\/films/).reply(200);
    render(component);
    expect(screen.getByAltText(mockedFilteredFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockedFilteredFilms[0].name)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/more like this/i)).toBeInTheDocument();
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadReviews.pending.type,
      loadReviews.fulfilled.type,
      loadSuggestions.pending.type,
      loadSuggestions.fulfilled.type,
      loadFilmDetails.pending.type,
      loadFilmDetails.fulfilled.type,
      loadFavoriteFilms.pending.type,
      loadFavoriteFilms.fulfilled.type,
    ]));
  });
});
