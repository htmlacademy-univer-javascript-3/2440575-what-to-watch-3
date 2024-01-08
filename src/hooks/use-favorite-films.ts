import { useAppDispatch, useAppSelector } from './index.ts';
import { useEffect } from 'react';
import { loadFavoriteFilms } from '../store/api-actions.ts';
import { AuthorizationStatus } from '../types/user.ts';

export function useFavoriteFilms() {
  const { favoriteFilms } = useAppSelector((state) => state.film);
  const { authorizationStatus } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      dispatch(loadFavoriteFilms());
    }
  }, [dispatch, authorizationStatus]);

  return { favoriteFilms };
}
