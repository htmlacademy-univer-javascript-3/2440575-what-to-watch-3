import { act, render } from '@testing-library/react';
import HistoryRouter from './index.tsx';
import { createMemoryHistory } from 'history';
import { AppRoutes } from '../../types/routes.ts';

describe('Component: HistoryRouter', () => {
  it('should render correctly', () => {
    const memoryHistory = createMemoryHistory();
    render(<HistoryRouter history={memoryHistory}/>);
    act(() => {
      memoryHistory.push(AppRoutes.SignIn);
    });
    expect(memoryHistory.location.pathname).toBe(AppRoutes.SignIn);
  });
});
