import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmsByGenre } from './action.ts';
import { filmsData } from '../mocks/films.ts';
import { GENRE_ALL_GENRES } from '../config/config.ts';

const initialState = {
  genre: 'All genres',
  films: filmsData,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(getFilmsByGenre, (state, action) => {
      const {genre} = action.payload;
      state.films =
        filmsData
          .filter((item) => genre === GENRE_ALL_GENRES ? item : item.genre === genre);
    });
});

export {reducer};
