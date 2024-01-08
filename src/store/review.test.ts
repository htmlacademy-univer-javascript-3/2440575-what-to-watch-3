import reviewSliceReducer, { initialState } from './review.ts';
import { mockReviewArray } from '../utils/mock-data.ts';
import { loadReviews } from './api-actions.ts';

describe('Slice: Review', () => {
  const mockedReviewArray = mockReviewArray();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = reviewSliceReducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = reviewSliceReducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should store reviews with "loadReviews" action', () => {
    const expectedState = { ...initialState, reviews: mockedReviewArray };
    const result = reviewSliceReducer(initialState, {type: loadReviews.fulfilled.type, payload: mockedReviewArray});
    expect(result).toEqual(expectedState);
  });
});
