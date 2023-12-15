import { useAppDispatch, useAppSelector } from './index.ts';
import { useEffect } from 'react';
import { loadFavouriteFilms } from '../store/api-actions.ts';
import { AuthorizationStatus } from '../types/user.ts';

export function useFavouriteFilms() {
  const { favouriteFilms } = useAppSelector((state) => state.film);
  const { authorizationStatus } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      dispatch(loadFavouriteFilms());
    }
  }, [dispatch, authorizationStatus]);

  return { favouriteFilms };
}
