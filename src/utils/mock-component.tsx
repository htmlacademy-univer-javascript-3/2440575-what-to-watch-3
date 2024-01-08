import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { initAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import { PropsWithChildren, ReactElement } from 'react';
import { BrowserHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router';
import { initialState as filmSliceState } from '../store/film.ts';
import { initialState as reviewsSliceState } from '../store/review.ts';
import { initialState as appSliceState } from '../store/app.ts';
import { initialState as userSliceState } from '../store/user.ts';
import { AxiosInstance } from 'axios';

interface ComponentWithMockStore {
  component: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
  mockHistory: BrowserHistory;
}

interface HookWrapperWithMockStore extends Omit<ComponentWithMockStore, 'component'> {
  wrapper: ({ children }: PropsWithChildren) => ReactElement;
}

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof initAPI>, Action>;

export function getMockStore (initialState: DeepPartial<State> = {}, axios: AxiosInstance) {
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  return mockStoreCreator({
    film: filmSliceState,
    review: reviewsSliceState,
    user: userSliceState,
    app: appSliceState,
    ...initialState
  });
}

export function withProviders(
  component: ReactElement,
  initialState: DeepPartial<State> = {},
): ComponentWithMockStore {
  const memoryHistory = createMemoryHistory();
  const axios = initAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const mockStore = getMockStore(initialState, axios);

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
    mockHistory: memoryHistory,
  });
}

export function getHookWrapper(initialState: DeepPartial<State> = {}): HookWrapperWithMockStore {
  const memoryHistory = createMemoryHistory();
  const axios = initAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const mockStore = getMockStore(initialState, axios);

  return ({
    wrapper: ({ children }: PropsWithChildren) => (
      <Provider store={mockStore}>
        <HistoryRouter history={memoryHistory}>
          {children}
        </HistoryRouter>
      </Provider>
    ),
    mockAxiosAdapter,
    mockHistory: memoryHistory,
    mockStore,
  });
}
