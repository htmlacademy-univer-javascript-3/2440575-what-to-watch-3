import { createAction } from '@reduxjs/toolkit';
import { FilmsPreviewData, User } from '../types';
import { AppRoute, AuthStatus } from '../config/config';

export const changeGenre = createAction<{genre: string}>('genre/changeGenre');
export const getFilmsByGenre = createAction<{genre: string}>('films/getFilmsByGenre');
export const loadFilmsData = createAction<FilmsPreviewData>('films/loadFilmsData');
export const setError = createAction<string | null>('films/setError');
export const setFilmsDataLoadingStatus = createAction<boolean>('films/setFilmsDataLoadingStatus');
export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');
export const setUserData = createAction<User>('user/setUserData');
export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
