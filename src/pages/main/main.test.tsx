import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { mockFilmArray, mockUserDetails } from '../../utils/mock-data.ts';
import { withProviders } from '../../utils/mock-component.tsx';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import { loadFavoriteFilms, loadPromoFilm } from '../../store/api-actions.ts';
import { AuthorizationStatus } from '../../types/user.ts';
import Main from './main.tsx';

describe('Component: Main', () => {
  const mockedFilteredFilms = mockFilmArray();
  const mockedUserDetails = mockUserDetails();
  const mockedGenres = [...new Set(mockedFilteredFilms.map(({genre}) => genre))];

  it('should render correctly and load data', async () => {
    const { component, mockStore, mockAxiosAdapter } = withProviders(<Main />, {
      user: {
        ...mockedUserDetails,
        authorizationStatus: AuthorizationStatus.Authorized,
      },
      film: {
        filmListPortion: mockedFilteredFilms.slice(1),
        selectedFilm: mockedFilteredFilms[0],
        filteredFilms: mockedFilteredFilms,
        filmListLength: mockedFilteredFilms.length - 1,
        genres: mockedGenres,
        selectedGenre: mockedGenres[0],
        favoriteFilms: mockedFilteredFilms,
      }
    });
    mockAxiosAdapter.onGet(/\/favorite/).reply(200, mockedFilteredFilms);
    mockAxiosAdapter.onGet(/\/promo/).reply(200, mockedFilteredFilms[0]);
    render(component);
    expect(screen.getByAltText(mockedFilteredFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockedFilteredFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadPromoFilm.pending.type,
      loadPromoFilm.fulfilled.type,
      loadFavoriteFilms.pending.type,
      loadFavoriteFilms.fulfilled.type,
    ]));
  });
});
