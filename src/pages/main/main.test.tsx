import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { mockFilmArray, mockUserDetails } from '../../utils/mock-data.ts';
import { withProviders } from '../../utils/mock-component.tsx';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import { loadFavoriteFilms, loadPromoFilm } from '../../store/api-actions.ts';
import { AuthorizationStatus } from '../../types/user.ts';
import Main from './main.tsx';
import { StatusCodes } from 'http-status-codes';

describe('Component: Main', () => {
  const mockFilteredFilms = mockFilmArray();
  const mockUserData = mockUserDetails();
  const mockGenres = [...new Set(mockFilteredFilms.map(({genre}) => genre))];

  it('should render correctly and load data', async () => {
    const { component, mockStore, mockAxiosAdapter } = withProviders(<Main />, {
      user: {
        ...mockUserData,
        authorizationStatus: AuthorizationStatus.Authorized,
      },
      film: {
        filmListPortion: mockFilteredFilms.slice(1),
        selectedFilm: mockFilteredFilms[0],
        filteredFilms: mockFilteredFilms,
        filmListLength: mockFilteredFilms.length - 1,
        genres: mockGenres,
        selectedGenre: mockGenres[0],
        favoriteFilms: mockFilteredFilms,
      }
    });
    mockAxiosAdapter.onGet(/\/favorite/).reply(StatusCodes.OK, mockFilteredFilms);
    mockAxiosAdapter.onGet(/\/promo/).reply(StatusCodes.OK, mockFilteredFilms[0]);
    render(component);
    expect(screen.getByAltText(mockFilteredFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilteredFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadPromoFilm.pending.type,
      loadPromoFilm.fulfilled.type,
      loadFavoriteFilms.pending.type,
      loadFavoriteFilms.fulfilled.type,
    ]));
  });
});
