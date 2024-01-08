import { render, screen, waitFor } from '@testing-library/react';
import { withProviders } from '../../utils/mock-component.tsx';
import { expect } from 'vitest';
import MyList from './index.tsx';
import { mockFilmArray, mockUserDetails } from '../../utils/mock-data.ts';
import { AuthorizationStatus } from '../../types/user.ts';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import { loadFavoriteFilms } from '../../store/api-actions.ts';
import { StatusCodes } from 'http-status-codes';

describe('Component: MyList', () => {
  const mockedfavoriteFilms = mockFilmArray();
  const mockedUserDetails = mockUserDetails();

  it('should render correctly', async () => {
    const { component, mockAxiosAdapter, mockStore } = withProviders(<MyList />, {
      user: {
        ...mockedUserDetails,
        authorizationStatus: AuthorizationStatus.Authorized,
      },
      film: {
        favoriteFilms: mockedfavoriteFilms,
      }
    });
    mockAxiosAdapter.onGet(/\/favorite/).reply(StatusCodes.OK, mockedfavoriteFilms);
    render(component);
    expect(screen.getByText(/my list/i)).toBeInTheDocument();
    expect(screen.getByText(mockedfavoriteFilms.length)).toBeInTheDocument();
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadFavoriteFilms.pending.type,
      loadFavoriteFilms.fulfilled.type,
    ]));
  });
});
