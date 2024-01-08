import { renderHook, waitFor } from '@testing-library/react';
import { useFavoriteFilms } from './useFavoriteFilms.ts';
import { getHookWrapper } from '../utils/mock-component.tsx';
import { mockFilmArray, mockUserDetails } from '../utils/mock-data.ts';
import { AuthorizationStatus } from '../types/user.ts';
import { extractActionsTypes } from '../utils/mock-reducer.ts';
import { loadFavoriteFilms } from '../store/api-actions.ts';
import { StatusCodes } from 'http-status-codes';

describe('Hook: useFavoriteFilms', () => {
  const mockUser = mockUserDetails();
  const mockFilmList = mockFilmArray();

  it('should load favorite films and return them when the user is authorized', async () => {
    const { wrapper, mockAxiosAdapter, mockStore } = getHookWrapper({
      film: {
        favoriteFilms: mockFilmList,
      },
      user: {
        ...mockUser,
        authorizationStatus: AuthorizationStatus.Authorized,
      }
    });
    mockAxiosAdapter.onGet(/\/favorite/).reply(StatusCodes.OK, mockFilmList);
    const { result } = renderHook(() => useFavoriteFilms(), { wrapper });
    const { favoriteFilms } = result.current;

    expect(favoriteFilms).toEqual(mockFilmList);

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadFavoriteFilms.pending.type,
      loadFavoriteFilms.fulfilled.type,
    ]));
  });

  it('should not load favorite films when the user is unauthorized', () => {
    const { wrapper, mockStore } = getHookWrapper({
      film: {
        favoriteFilms: [],
      },
      user: {
        ...mockUser,
        authorizationStatus: AuthorizationStatus.Unauthorized,
      }
    });
    const { result } = renderHook(() => useFavoriteFilms(), { wrapper });
    const { favoriteFilms } = result.current;

    expect(favoriteFilms).toEqual([]);

    expect(extractActionsTypes(mockStore.getActions())).toEqual([]);
  });
});
