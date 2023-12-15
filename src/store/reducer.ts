import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  getFilmsByGenre,
  loadFilmsData,
  requireAuthorization,
  setError,
  setFilmsDataLoadingStatus,
  setUserData
} from './action.ts';
import { AuthStatus, GENRE_ALL_GENRES } from '../config/config.ts';
import { FilmsPreviewData, User } from '../types';

type InitialState = {
  genre: string;
  films: FilmsPreviewData;
  sortedFilms: FilmsPreviewData;
  authStatus: AuthStatus;
  user: User;
  isFilmsDataLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  genre: 'All genres',
  films: [],
  sortedFilms: [],
  authStatus: AuthStatus.Unknown,
  user: {
    name: '',
    avatarUrl: '',
    email: '',
  },
  isFilmsDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(getFilmsByGenre, (state, action) => {
      const {genre} = action.payload;
      state.sortedFilms =
        state.films
          .filter((item) => genre === GENRE_ALL_GENRES ? item : item.genre === genre);
    })
    .addCase(loadFilmsData, (state, action) => {
      state.films = action.payload;
      state.sortedFilms = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
