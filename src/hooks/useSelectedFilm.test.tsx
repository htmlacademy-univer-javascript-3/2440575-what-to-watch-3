import { renderHook, waitFor } from '@testing-library/react';
import { getHookWrapper } from '../utils/mock-component.tsx';
import { mockFilmArray, mockReviewArray } from '../utils/mock-data.ts';
import { extractActionsTypes } from '../utils/mock-reducer.ts';
import { loadFilmDetails, loadReviews, loadSuggestions } from '../store/api-actions.ts';
import { useSelectedFilm } from './useSelectedFilm.ts';
import { expect } from 'vitest';
import { NOT_FOUND_URL } from '../constants/route.ts';
import { StatusCodes } from 'http-status-codes';

describe('Hook: useSelectedFilm', () => {
  const mockFilmList = mockFilmArray();
  const mockReviews = mockReviewArray();
  const mockFilm = mockFilmList[0];

  it('should load film based on URL parameter and return it', async () => {
    const { wrapper, mockAxiosAdapter, mockStore } = getHookWrapper({
      film: {
        selectedFilm: mockFilm,
      },
    });
    mockAxiosAdapter.onGet(/\/film/).reply(StatusCodes.OK, mockFilm);
    const { result } = renderHook(() => useSelectedFilm({}), { wrapper });
    const { selectedFilm } = result.current;

    expect(selectedFilm).toEqual(mockFilm);

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadFilmDetails.pending.type,
      loadFilmDetails.fulfilled.type,
    ]));
  });

  it('should redirect to not found screen when the film load fails with 404', async () => {
    const { wrapper, mockAxiosAdapter, mockStore, mockHistory } = getHookWrapper();
    mockAxiosAdapter.onGet(/\/film/).reply(StatusCodes.NOT_FOUND, {message: 'error message'});
    renderHook(() => useSelectedFilm({}), { wrapper });

    await waitFor(() => expect(mockHistory.location.pathname).toBe(NOT_FOUND_URL));

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual(expect.arrayContaining([
      loadFilmDetails.rejected.type,
      loadFilmDetails.pending.type,
    ])));
  });

  it('should load suggestions and reviews on demand and return them', async () => {
    const { wrapper, mockAxiosAdapter, mockStore } = getHookWrapper({
      film: {
        selectedFilm: mockFilm,
        suggestionPortion: mockFilmList,
      },
      review: {
        reviews: mockReviews,
      }
    });
    mockAxiosAdapter.onGet(/\/film/).reply(StatusCodes.OK);
    mockAxiosAdapter.onGet(/\/comments/).reply(StatusCodes.OK, mockReviews);
    const { result } = renderHook(() => useSelectedFilm({
      shouldLoadSuggestions: true,
      shouldLoadReviews: true,
    }), { wrapper });
    const { selectedFilm, reviews, suggestionPortion } = result.current;

    expect(selectedFilm).toEqual(mockFilm);
    expect(reviews).toEqual(mockReviews);
    expect(suggestionPortion).toEqual(mockFilmList);

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadReviews.pending.type,
      loadReviews.fulfilled.type,
      loadSuggestions.pending.type,
      loadSuggestions.fulfilled.type,
      loadFilmDetails.pending.type,
      loadFilmDetails.fulfilled.type,
    ]));
  });
});
