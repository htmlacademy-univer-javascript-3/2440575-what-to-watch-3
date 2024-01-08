import userSliceReducer, { initialState } from './user.ts';
import { signIn, signOut, verifyToken } from './api-actions.ts';
import { AuthorizationStatus } from '../types/user.ts';
import { mockUserDetails } from '../utils/mock-data.ts';

describe('Slice: User', () => {
  const mockedUserDetails = mockUserDetails();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userSliceReducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = userSliceReducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should change auth status with "signIn" action', () => {
    const expectedState = { ...initialState, ...mockedUserDetails, authorizationStatus: AuthorizationStatus.Authorized };
    const result = userSliceReducer(initialState, {type: signIn.fulfilled.type, payload: mockedUserDetails});
    expect(result).toEqual(expectedState);
  });

  it('should change auth status with "verifyToken" action', () => {
    const expectedState = { ...initialState, ...mockedUserDetails, authorizationStatus: AuthorizationStatus.Authorized };
    const result = userSliceReducer(initialState, {type: verifyToken.fulfilled.type, payload: mockedUserDetails});
    expect(result).toEqual(expectedState);
  });

  it('should change auth status with "signOut" action', () => {
    const expectedState = { ...initialState, authorizationStatus: AuthorizationStatus.Unauthorized };
    const result = userSliceReducer(initialState, signOut.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
