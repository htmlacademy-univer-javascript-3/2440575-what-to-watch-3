import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.ts';
import { createApi } from '../services/';
import { redirect } from './middleware';


export const api = createApi();
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});
