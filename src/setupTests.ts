import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import * as tokenStorage from './services/storage.ts';
import { mockToken } from './utils/mock-data.ts';

vi.spyOn(tokenStorage, 'getToken').mockReturnValue(mockToken());

expect.extend(matchers);
