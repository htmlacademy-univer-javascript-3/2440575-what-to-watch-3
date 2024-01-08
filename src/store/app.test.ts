import appSliceReducer, { initialState } from './app.ts';
import * as actions from './api-actions.ts';
import { addReview, clearRequestCount, setIsFavorite, signIn, verifyToken } from './api-actions.ts';

describe('Slice: App', () => {
  const apiActions = Object.values(actions)
    .filter((action) => action.typePrefix !== clearRequestCount.typePrefix && action.typePrefix !== addReview.typePrefix);

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appSliceReducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = appSliceReducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should increase request counter with pending api actions', () => {
    const expectedState = { ...initialState, pendingRequestsCount: initialState.pendingRequestsCount + 1 };
    for (const apiAction of apiActions) {
      const result = appSliceReducer(initialState, apiAction.pending);
      expect(result).toEqual(expectedState);
    }
  });

  it('should decrease request counter with fulfilled api actions', () => {
    const expectedState = { ...initialState, pendingRequestsCount: initialState.pendingRequestsCount - 1 };
    for (const apiAction of apiActions) {
      const result = appSliceReducer(initialState, apiAction.fulfilled);
      expect(result).toEqual(expectedState);
    }
  });

  it('should decrease request counter with rejected "verifyToken" action', () => {
    const expectedState = { ...initialState, pendingRequestsCount: initialState.pendingRequestsCount - 1 };
    const result = appSliceReducer(initialState, verifyToken.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should decrease request counter with rejected "signIn" action', () => {
    const expectedState = { ...initialState, pendingRequestsCount: initialState.pendingRequestsCount - 1 };
    const result = appSliceReducer(initialState, signIn.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should decrease request counter with rejected "setIsFavorite" action', () => {
    const expectedState = { ...initialState, pendingRequestsCount: initialState.pendingRequestsCount - 1 };
    const result = appSliceReducer(initialState, setIsFavorite.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should clear request counter with "clearRequestCount" action', () => {
    const expectedState = { ...initialState, pendingRequestsCount: 0 };
    const result = appSliceReducer({...initialState, pendingRequestsCount: Number.MAX_VALUE}, clearRequestCount.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
