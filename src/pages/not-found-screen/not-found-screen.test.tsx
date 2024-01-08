import { render, screen } from '@testing-library/react';
import NotFoundScreen from './index.tsx';
import { withProviders } from '../../utils/mock-component.tsx';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { AppRoutes } from '../../types/routes.ts';
import { clearRequestCount } from '../../store/api-actions.ts';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';

describe('Component: SignInForm', () => {
  it('should render correctly and display redirect link', async () => {
    const {component, history, mockStore} = withProviders(<NotFoundScreen />);
    render(component);
    expect(screen.getByText(/ошибка 404\. страница не найдена/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: /вернуться на главную страницу/i}));
    expect(history.location.pathname).toBe(AppRoutes.Main);
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      clearRequestCount.pending.type,
      clearRequestCount.fulfilled.type,
    ]);
  });
});
