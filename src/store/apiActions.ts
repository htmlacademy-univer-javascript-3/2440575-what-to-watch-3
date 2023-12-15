import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, FilmsPreviewData, State, UserData } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../config/config.ts';
import {
  loadFilmsData,
  redirectToRoute,
  requireAuthorization,
  setError,
  setFilmsDataLoadingStatus,
  setUserData
} from './action.ts';
import { store } from './';
import { dropToken, saveToken } from '../services/token/token.ts';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<FilmsPreviewData>(APIRoute.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilmsData(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl, name}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setUserData({
      email, avatarUrl, name
    }));
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(setUserData({
      name: '',
      avatarUrl: '',
      email: '',
    }));
  },
);


export const clearErrorAction = createAsyncThunk(
  'films/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  },
);
