import browserHistory from '../../browserHistory.ts';
import { reducer } from '../reducer.ts';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'game/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
