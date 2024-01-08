import { mockToken } from '../utils/mock-data.ts';
import { afterEach, expect } from 'vitest';
import * as tokenStorage from './storage.ts';
import { AUTH_TOKEN_KEY_NAME } from './storage.ts';

describe('Service: Storage', () => {
  const mockAuthToken = mockToken();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should save token in storage', () => {
    const setItemStub =
      vi.spyOn(Storage.prototype, 'setItem');
    tokenStorage.saveToken(mockAuthToken);
    expect(setItemStub).toBeCalledTimes(1);
    expect(setItemStub).toHaveBeenLastCalledWith(AUTH_TOKEN_KEY_NAME, mockAuthToken);
  });

  it('should drop token from storage', () => {
    const removeItemStub =
      vi.spyOn(Storage.prototype, 'removeItem');
    tokenStorage.dropToken();
    expect(removeItemStub).toBeCalledTimes(1);
    expect(removeItemStub).toHaveBeenLastCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should get token from storage', () => {
    vi.restoreAllMocks();
    const getItemStub =
      vi.spyOn(Storage.prototype, 'getItem');
    tokenStorage.getToken();
    expect(getItemStub).toBeCalledTimes(1);
    expect(getItemStub).toHaveBeenLastCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
