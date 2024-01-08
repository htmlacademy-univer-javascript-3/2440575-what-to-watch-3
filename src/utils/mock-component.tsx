import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { initAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import { BrowserHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router';
import {initialState as filmSliceState} from '../store/film.ts';
import {initialState as reviewsSliceState} from '../store/review.ts';
import {initialState as appSliceState} from '../store/app.ts';
import {initialState as userSliceState} from '../store/user.ts';

type ComponentWithMockStore = {
  component: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
  history: BrowserHistory;
}

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof initAPI>, Action>;

export function withProviders(
  component: ReactElement,
  initialState: DeepPartial<State> = {},
): ComponentWithMockStore {
  const memoryHistory = createMemoryHistory();

  const axios = initAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator({
    film: filmSliceState,
    review: reviewsSliceState,
    user: userSliceState,
    app: appSliceState,
    ...initialState
  });

  return ({
    component: (
      <Provider store={mockStore}>
        <HistoryRouter history={memoryHistory}>
          {component}
        </HistoryRouter>
      </Provider>
    ),
    mockStore,
    mockAxiosAdapter,
    history: memoryHistory,
  });
}
