import { configureMockStore } from '@jedmao/redux-mock-store';
import { initAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import { AppThunkDispatch } from '../utils/mock-component.tsx';
import { initialState as filmSliceState } from './film.ts';
import { initialState as reviewSliceState } from './review.ts';
import { initialState as userSliceState } from './user.ts';
import { initialState as appSliceState } from './app.ts';
import {
  addReview,
  clearRequestCount,
  loadFavoriteFilms,
  loadFilmDetails,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSuggestions, setIsFavorite,
  signIn, signOut,
  verifyToken
} from './api-actions.ts';
import { extractActionsTypes } from '../utils/mock-reducer.ts';
import { mockFilmArray, mockReviewArray, mockToken, mockUserCredentials, mockUserDetails } from '../utils/mock-data.ts';
import * as tokenStorage from '../services/storage.ts';

describe('Async actions', () => {
  const axios = initAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockedUserCredentials = mockUserCredentials();
  const mockedUserDetails = mockUserDetails();
  const mockedFilmArray = mockFilmArray();
  const mockedReviewArray = mockReviewArray();
  const mockedToken = mockToken();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      film: filmSliceState,
      review: reviewSliceState,
      user: userSliceState,
      app: appSliceState,
    });
  });

  it('should dispatch "signIn.pending" and "signIn.fulfilled" with thunk "signIn', async () => {
    mockAxiosAdapter.onPost(/\/login/).replyOnce(200, { token: mockedToken });
    const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
    await store.dispatch(signIn(mockedUserCredentials));
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const signInActionFulfilled = emittedActions.at(1) as ReturnType<typeof signIn.fulfilled>;


    expect(mockSaveToken).toBeCalledTimes(1);
    expect(mockSaveToken).toHaveBeenLastCalledWith(mockedToken);

    expect(extractedActionsTypes).toEqual([
      signIn.pending.type,
      signIn.fulfilled.type,
    ]);

    expect(signInActionFulfilled.payload)
      .toEqual({ token: mockedToken });
  });

  it('should dispatch "loadFilms.pending" and "loadFilms.fulfilled" with thunk "loadFilms', async () => {
    mockAxiosAdapter.onGet(/\/films/).replyOnce(200, mockedFilmArray);
    await store.dispatch(loadFilms());
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof loadFilms.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      loadFilms.pending.type,
      loadFilms.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedFilmArray);
  });

  it('should dispatch "loadPromoFilm.pending" and "loadPromoFilm.fulfilled" with thunk "loadPromoFilm', async () => {
    mockAxiosAdapter.onGet(/\/promo/).replyOnce(200, mockedFilmArray[0]);
    await store.dispatch(loadPromoFilm());
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof loadPromoFilm.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      loadPromoFilm.pending.type,
      loadPromoFilm.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedFilmArray[0]);
  });

  it('should dispatch "loadFilmDetails.pending" and "loadFilmDetails.fulfilled" with thunk "loadFilmDetails', async () => {
    mockAxiosAdapter.onGet(/\/films/).replyOnce(200, mockedFilmArray[0]);
    await store.dispatch(loadFilmDetails(mockedFilmArray[0].id));
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof loadFilmDetails.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      loadFilmDetails.pending.type,
      loadFilmDetails.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedFilmArray[0]);
  });

  it('should dispatch "loadSuggestions.pending" and "loadSuggestions.fulfilled" with thunk "loadSuggestions', async () => {
    mockAxiosAdapter.onGet(/\/films/).replyOnce(200, mockedFilmArray);
    await store.dispatch(loadSuggestions(mockedFilmArray[0].id));
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof loadSuggestions.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      loadSuggestions.pending.type,
      loadSuggestions.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedFilmArray);
  });

  it('should dispatch "loadReviews.pending" and "loadReviews.fulfilled" with thunk "loadReviews', async () => {
    mockAxiosAdapter.onGet(/\/comments/).replyOnce(200, mockedReviewArray);
    await store.dispatch(loadReviews(mockedFilmArray[0].id));
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof loadReviews.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      loadReviews.pending.type,
      loadReviews.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedReviewArray);
  });

  it('should dispatch "verifyToken.pending" and "verifyToken.fulfilled" with thunk "verifyToken', async () => {
    mockAxiosAdapter.onGet(/\/login/).replyOnce(200, mockedUserDetails);
    await store.dispatch(verifyToken());
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof verifyToken.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      verifyToken.pending.type,
      verifyToken.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedUserDetails);
  });

  it('should dispatch "verifyToken.pending" and "verifyToken.rejected" when server response 400', async () => {
    mockAxiosAdapter.onGet(/\/login/).replyOnce(400);
    const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

    await store.dispatch(verifyToken());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      verifyToken.rejected.type,
      verifyToken.pending.type,
    ]);

    expect(mockDropToken).toBeCalledTimes(1);
    expect(mockDropToken).toHaveBeenLastCalledWith();
  });

  it('should dispatch "signOut.pending" and "signOut.fulfilled" with thunk "signOut', async () => {
    mockAxiosAdapter.onDelete(/\/logout/).replyOnce(200);
    const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
    await store.dispatch(signOut());
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);

    expect(extractedActionsTypes).toEqual([
      signOut.pending.type,
      signOut.fulfilled.type,
    ]);

    expect(mockDropToken).toBeCalledTimes(1);
    expect(mockDropToken).toHaveBeenLastCalledWith();
  });

  it('should dispatch "loadFavoriteFilms.pending" and "loadFavoriteFilms.fulfilled" with thunk "loadFavoriteFilms', async () => {
    mockAxiosAdapter.onGet(/\/favorite/).replyOnce(200, mockedFilmArray);
    await store.dispatch(loadFavoriteFilms());
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof loadFavoriteFilms.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      loadFavoriteFilms.pending.type,
      loadFavoriteFilms.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedFilmArray);
  });

  it('should dispatch "clearRequestCount.pending" and "clearRequestCount.fulfilled" with thunk "clearRequestCount', async () => {
    await store.dispatch(clearRequestCount());
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);

    expect(extractedActionsTypes).toEqual([
      clearRequestCount.pending.type,
      clearRequestCount.fulfilled.type,
    ]);
  });

  it('should dispatch "addReview.pending" and "addReview.fulfilled" with thunk "addReview', async () => {
    mockAxiosAdapter.onPost(/\/comments/).replyOnce(200);
    await store.dispatch(addReview({filmId: mockedFilmArray[0].id, ...mockedReviewArray[0]}));
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);

    expect(extractedActionsTypes).toEqual([
      addReview.pending.type,
      addReview.fulfilled.type,
    ]);
  });

  it('should dispatch "setIsFavorite.pending" and "setIsFavorite.fulfilled" with thunk "setIsFavorite', async () => {
    mockAxiosAdapter.onPost(/\/favorite/).replyOnce(200, mockedFilmArray[0]);
    await store.dispatch(setIsFavorite({filmId: mockedFilmArray[0].id, status: Number(mockedFilmArray[0].isFavorite)}));
    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const actionFulfilled = emittedActions.at(1) as ReturnType<typeof setIsFavorite.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      setIsFavorite.pending.type,
      setIsFavorite.fulfilled.type,
    ]);

    expect(actionFulfilled.payload)
      .toEqual(mockedFilmArray[0]);
  });
});
