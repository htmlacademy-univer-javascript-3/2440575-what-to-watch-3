import filmSliceReducer, { initialState, setSelectedGenre, showMoreFilms } from './film.ts';
import { mockFilmArray } from '../utils/mock-data.ts';
import {
  loadFavoriteFilms,
  loadFilmDetails,
  loadFilms,
  loadPromoFilm,
  loadSuggestions,
  setIsFavorite,
  signOut
} from './api-actions.ts';
import { ALL_GENRES } from '../constants/film.ts';
import { PortionSizes } from '../types/film.ts';

describe('Slice: Film', () => {
  const mockFilmList = mockFilmArray();
  const mockFilmDetails = mockFilmList[0];
  const mockGenre = mockFilmDetails.genre;
  const mockGenres = [ALL_GENRES, ...new Set(mockFilmList.map(({ genre }) => genre))];

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = filmSliceReducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = filmSliceReducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should change genre to specific with "setSelectedGenre" action', () => {
    const expectedState = { ...initialState, selectedGenre: mockGenre };
    const result = filmSliceReducer(initialState, setSelectedGenre(mockGenre));
    expect(result).toEqual(expectedState);
  });

  it('should change genre to all with "setSelectedGenre" action', () => {
    const expectedState = { ...initialState, selectedGenre: ALL_GENRES };
    const result = filmSliceReducer(initialState, setSelectedGenre(ALL_GENRES));
    expect(result).toEqual(expectedState);
  });

  it('should increase filtered list length with "showMoreFilms" action', () => {
    const expectedState = { ...initialState, filmListLength: initialState.filmListLength + PortionSizes.FilmList };
    const result = filmSliceReducer(initialState, showMoreFilms());
    expect(result).toEqual(expectedState);
  });

  it('should store film list with "loadFilms" action', () => {
    const expectedState = {
      ...initialState,
      genres: mockGenres.slice(0, PortionSizes.Genres),
      films: mockFilmList,
      filteredFilms: mockFilmList,
      filmListPortion: mockFilmList.slice(0, PortionSizes.FilmList)
    };
    const result = filmSliceReducer(initialState, { type: loadFilms.fulfilled.type, payload: mockFilmList });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "loadPromoFilm" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: loadPromoFilm.fulfilled.type, payload: mockFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "loadFilmDetails" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: loadFilmDetails.fulfilled.type, payload: mockFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "setIsFavorite" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: setIsFavorite.fulfilled.type, payload: mockFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "setIsFavorite" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: setIsFavorite.fulfilled.type, payload: mockFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film list with "loadSuggestions" action', () => {
    const expectedState = {
      ...initialState,
      suggestions: mockFilmList,
      suggestionPortion: mockFilmList.slice(0, PortionSizes.Suggestions)
    };
    const result = filmSliceReducer(initialState, { type: loadSuggestions.fulfilled.type, payload: mockFilmList });
    expect(result).toEqual(expectedState);
  });

  it('should store film list with "loadFavoriteFilms" action', () => {
    const expectedState = {
      ...initialState,
      favoriteFilms: mockFilmList,
    };
    const result = filmSliceReducer(initialState, { type: loadFavoriteFilms.fulfilled.type, payload: mockFilmList });
    expect(result).toEqual(expectedState);
  });

  it('should clear favorite film list and with "signOut" action', () => {
    const expectedState = {
      ...initialState,
      favoriteFilms: [],
    };
    const result = filmSliceReducer(initialState, signOut.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should update selected film info with "signOut" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: {...mockFilmDetails, isFavorite: false},
      favoriteFilms: [],
    };
    const result = filmSliceReducer({...initialState, selectedFilm: mockFilmDetails}, signOut.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
