import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmsByGenre, loadFilmsData, setError, setFilmsDataLoadingStatus } from './action.ts';
import { AuthStatus, GENRE_ALL_GENRES } from '../config/config.ts';
import { FilmsPreviewData } from '../types';

type InitialState = {
  genre: string;
  films: FilmsPreviewData;
  sortedFilms: FilmsPreviewData;
  auth: AuthStatus;
  isFilmsDataLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  genre: 'All genres',
  films: [],
  sortedFilms: [],
  auth: AuthStatus.Unknown,
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
