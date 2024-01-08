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
import { ALL_GENRES, FILM_LIST_PORTION_SIZE, SUGGESTION_PORTION_SIZE } from '../constants/film.ts';

describe('Slice: Film', () => {
  const mockedFilmArray = mockFilmArray();
  const mockedFilmDetails = mockedFilmArray[0];
  const mockedGenre = mockedFilmDetails.genre;
  const mockedGenres = [ALL_GENRES, ...new Set(mockedFilmArray.map(({ genre }) => genre))];

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
    const expectedState = { ...initialState, selectedGenre: mockedGenre };
    const result = filmSliceReducer(initialState, setSelectedGenre(mockedGenre));
    expect(result).toEqual(expectedState);
  });

  it('should change genre to all with "setSelectedGenre" action', () => {
    const expectedState = { ...initialState, selectedGenre: ALL_GENRES };
    const result = filmSliceReducer(initialState, setSelectedGenre(ALL_GENRES));
    expect(result).toEqual(expectedState);
  });

  it('should increase filtered list length with "showMoreFilms" action', () => {
    const expectedState = { ...initialState, filmListLength: initialState.filmListLength + FILM_LIST_PORTION_SIZE };
    const result = filmSliceReducer(initialState, showMoreFilms());
    expect(result).toEqual(expectedState);
  });

  it('should store film list with "loadFilms" action', () => {
    const expectedState = {
      ...initialState,
      genres: mockedGenres,
      films: mockedFilmArray,
      filteredFilms: mockedFilmArray,
      filmListPortion: mockedFilmArray.slice(0, FILM_LIST_PORTION_SIZE)
    };
    const result = filmSliceReducer(initialState, { type: loadFilms.fulfilled.type, payload: mockedFilmArray });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "loadPromoFilm" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockedFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: loadPromoFilm.fulfilled.type, payload: mockedFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "loadFilmDetails" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockedFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: loadFilmDetails.fulfilled.type, payload: mockedFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "setIsFavorite" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockedFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: setIsFavorite.fulfilled.type, payload: mockedFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film details with "setIsFavorite" action', () => {
    const expectedState = {
      ...initialState,
      selectedFilm: mockedFilmDetails,
    };
    const result = filmSliceReducer(initialState, { type: setIsFavorite.fulfilled.type, payload: mockedFilmDetails });
    expect(result).toEqual(expectedState);
  });

  it('should store film list with "loadSuggestions" action', () => {
    const expectedState = {
      ...initialState,
      suggestions: mockedFilmArray,
      suggestionPortion: mockedFilmArray.slice(0, SUGGESTION_PORTION_SIZE)
    };
    const result = filmSliceReducer(initialState, { type: loadSuggestions.fulfilled.type, payload: mockedFilmArray });
    expect(result).toEqual(expectedState);
  });

  it('should store film list with "loadFavoriteFilms" action', () => {
    const expectedState = {
      ...initialState,
      favoriteFilms: mockedFilmArray,
    };
    const result = filmSliceReducer(initialState, { type: loadFavoriteFilms.fulfilled.type, payload: mockedFilmArray });
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
      selectedFilm: {...mockedFilmDetails, isFavorite: false},
      favoriteFilms: [],
    };
    const result = filmSliceReducer({...initialState, selectedFilm: mockedFilmDetails}, signOut.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
