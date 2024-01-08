import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signOut, verifyToken } from './api-actions.ts';
import { AuthorizationStatus, UserData } from '../types/user.ts';
import { getToken } from '../services/storage.ts';

interface UserSliceState extends UserData {
  authorizationStatus: AuthorizationStatus;
}

const token = getToken();

export const initialState: UserSliceState = {
  authorizationStatus: token ? AuthorizationStatus.Unknown : AuthorizationStatus.Unauthorized,
  name: '',
  avatarUrl: '',
  email: '',
  token: '',
};

function authorize(state: UserSliceState, action: PayloadAction<UserData>) {
  return {
    ...state,
    ...action.payload,
    authorizationStatus: AuthorizationStatus.Authorized,
  };
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, authorize);
    builder.addCase(verifyToken.fulfilled, authorize);
    builder.addCase(signOut.fulfilled, () => ({
      ...initialState,
      authorizationStatus: AuthorizationStatus.Unauthorized
    }));
  },
});

export default userSlice.reducer;
