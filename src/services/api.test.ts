import * as tokenStorage from './storage.ts';
import { mockToken } from '../utils/mock-data.ts';
import { afterEach, expect, SpyInstance } from 'vitest';
import { initAPI } from './api.ts';
import { getMockStore } from '../utils/mock-component.tsx';
import { verifyToken } from '../store/api-actions.ts';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import * as faker from 'faker';

describe('Service: Api', () => {
  const mockAuthToken = mockToken();
  const errorMessage = faker.datatype.string();
  let getTokenStub: SpyInstance<[], string>;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should use token in headers when it is set', async () => {
    getTokenStub = vi
      .spyOn(tokenStorage, 'getToken')
      .mockImplementation(() => mockAuthToken);
    const axios = initAPI();
    const mockAxiosAdapter = new MockAdapter(axios);
    const mockStore = getMockStore({}, axios);
    await mockStore.dispatch(verifyToken());
    expect(getTokenStub).toBeCalledTimes(1);
    const requestToken = mockAxiosAdapter.history.get?.[0]?.headers?.['x-token'];
    expect(requestToken).toEqual(mockAuthToken);
  });

  it('should not use any token in headers when it is absent', async () => {
    getTokenStub = vi
      .spyOn(tokenStorage, 'getToken')
      .mockImplementation(() => '');
    const axios = initAPI();
    const mockAxiosAdapter = new MockAdapter(axios);
    const mockStore = getMockStore({}, axios);
    await mockStore.dispatch(verifyToken());
    expect(getTokenStub).toBeCalledTimes(1);
    const requestHeaders = Object.keys(mockAxiosAdapter.history.get?.[0]?.headers ?? {});
    expect(requestHeaders).not.toEqual(expect.arrayContaining(['x-token']));
  });

  it('should display toaster when request fails with message', async () => {
    const warnStub = vi
      .spyOn(toast, 'warn')
      .mockImplementation(() => '');
    const axios = initAPI();
    const mockAxiosAdapter = new MockAdapter(axios);
    const mockStore = getMockStore({}, axios);
    mockAxiosAdapter.onGet(/\/login/).reply(StatusCodes.NOT_FOUND, {message: errorMessage});
    await mockStore.dispatch(verifyToken());
    expect(warnStub).toBeCalledTimes(1);
    expect(warnStub).toHaveBeenLastCalledWith(errorMessage);
  });
});
