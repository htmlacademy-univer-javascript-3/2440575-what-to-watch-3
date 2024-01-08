import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALL_GENRES } from '../constants/film.ts';
import { FilmDetails, PortionSizes, FilmPreview } from '../types/film.ts';
import {
  loadFavoriteFilms,
  loadFilmDetails,
  loadFilms,
  loadPromoFilm,
  loadSuggestions,
  setIsFavorite,
  signOut
} from './api-actions.ts';

interface FilmSliceState {
  suggestions: FilmPreview[];
  favoriteFilms: FilmPreview[];
  suggestionPortion: FilmPreview[];
  selectedFilm?: FilmDetails;
  films: FilmPreview[];
  filteredFilms: FilmPreview[];
  filmListPortion: FilmPreview[];
  genres: string[];
  selectedGenre: string;
  filmListLength: number;
}

export const initialState: FilmSliceState = {
  favoriteFilms: [],
  suggestions: [],
  suggestionPortion: [],
  films: [],
  filteredFilms: [],
  filmListPortion: [],
  genres: [ALL_GENRES],
  selectedGenre: ALL_GENRES,
  filmListLength: PortionSizes.FilmList,
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
          filmListLength: PortionSizes.FilmList,
          filmListPortion: filteredFilms.slice(0, PortionSizes.FilmList)
        }
      );
    },
    showMoreFilms: (state) => {
      const newLength = state.filmListLength + PortionSizes.FilmList;

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
        filmListLength: PortionSizes.FilmList,
        genres: [ALL_GENRES, ...new Set(action.payload.map(({ genre }) => genre))].slice(0, PortionSizes.Genres),
        films: action.payload,
        filteredFilms: action.payload,
        filmListPortion: action.payload.slice(0, PortionSizes.FilmList),
      }
    ));
    builder.addCase(loadPromoFilm.fulfilled, setSelectedFilm);
    builder.addCase(loadFilmDetails.fulfilled, setSelectedFilm);
    builder.addCase(setIsFavorite.fulfilled, setSelectedFilm);
    builder.addCase(loadSuggestions.fulfilled, (state, action: PayloadAction<FilmPreview[]>) => (
      {
        ...state,
        suggestions: action.payload,
        suggestionPortion: action.payload.slice(0, PortionSizes.Suggestions),
      }
    ));
    builder.addCase(loadFavoriteFilms.fulfilled, (state, action: PayloadAction<FilmPreview[]>) => (
      {
        ...state,
        favoriteFilms: action.payload,
      }
    ));
    builder.addCase(signOut.fulfilled, (state) => ({
      ...state,
      favoriteFilms: [],
      selectedFilm: state.selectedFilm ? { ...state.selectedFilm, isFavorite: false } : undefined,
    }));
  },
});

export const { setSelectedGenre, showMoreFilms } = filmSlice.actions;
export default filmSlice.reducer;
