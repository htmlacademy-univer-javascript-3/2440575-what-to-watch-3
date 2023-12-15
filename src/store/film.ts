import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALL_GENRES, FILM_LIST_PORTION_SIZE, SUGGESTION_PORTION_SIZE } from '../constants/film.ts';
import { FilmDetails, FilmPreview } from '../types/film.ts';
import {
  loadFavouriteFilms,
  loadFilmDetails,
  loadFilms,
  loadPromoFilm,
  loadSuggestions,
  setIsFavorite
} from './api-actions.ts';

interface FilmSliceState {
  suggestions: FilmPreview[];
  favouriteFilms: FilmPreview[];
  suggestionPortion: FilmPreview[];
  selectedFilm?: FilmDetails;
  films: FilmPreview[];
  filteredFilms: FilmPreview[];
  filmListPortion: FilmPreview[];
  genres: string[];
  selectedGenre: string;
  filmListLength: number;
}

const initialState: FilmSliceState = {
  favouriteFilms: [],
  suggestions: [],
  suggestionPortion: [],
  films: [],
  filteredFilms: [],
  filmListPortion: [],
  genres: [ALL_GENRES],
  selectedGenre: ALL_GENRES,
  filmListLength: FILM_LIST_PORTION_SIZE,
};

function setSelectedFilm(state: FilmSliceState, action: PayloadAction<FilmDetails>) {
  state.selectedFilm = action.payload;
}

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      const filteredFilms =
        action.payload === ALL_GENRES
          ? state.films
          : state.films.filter((film) => film.genre === action.payload);

      return (
        {
          ...state,
          selectedGenre: action.payload,
          filteredFilms,
          filmListLength: FILM_LIST_PORTION_SIZE,
          filmListPortion: filteredFilms.slice(0, FILM_LIST_PORTION_SIZE)
        }
      );
    },
    showMoreFilms: (state) => {
      const newLength = state.filmListLength + FILM_LIST_PORTION_SIZE;

      return (
        {
          ...state,
          filmListLength: newLength,
          filmListPortion: state.filteredFilms.slice(0, newLength)
        }
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadFilms.fulfilled, (state, action: PayloadAction<FilmPreview[]>) => (
      {
        ...state,
        selectedGenre: ALL_GENRES,
        filmListLength: FILM_LIST_PORTION_SIZE,
        genres: [ALL_GENRES, ...new Set(action.payload.map(({ genre }) => genre))],
        films: action.payload,
        filteredFilms: action.payload,
        filmListPortion: action.payload.slice(0, FILM_LIST_PORTION_SIZE),
      }
    ));
    builder.addCase(loadPromoFilm.fulfilled, setSelectedFilm);
    builder.addCase(loadFilmDetails.fulfilled, setSelectedFilm);
    builder.addCase(setIsFavorite.fulfilled, setSelectedFilm);
    builder.addCase(loadSuggestions.fulfilled, (state, action: PayloadAction<FilmPreview[]>) => (
      {
        ...state,
        suggestions: action.payload,
        suggestionPortion: action.payload.slice(0, SUGGESTION_PORTION_SIZE),
      }
    ));
    builder.addCase(loadFavouriteFilms.fulfilled, (state, action: PayloadAction<FilmPreview[]>) => (
      {
        ...state,
        favouriteFilms: action.payload,
      }
    ));
  },
});

export const { setSelectedGenre, showMoreFilms } = filmSlice.actions;
export default filmSlice.reducer;
