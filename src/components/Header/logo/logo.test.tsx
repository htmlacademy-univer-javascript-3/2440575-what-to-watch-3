import { render, screen } from '@testing-library/react';
import Logo from './index.tsx';
import userEvent from '@testing-library/user-event';
import { withProviders } from '../../../utils/mock-component.tsx';
import { AppRoutes } from '../../../types/routes.ts';

describe('Component: Logo', () => {
  it('should render correctly', async () => {
    const { component, history } = withProviders(<Logo />);
    render(component);
    const link = screen.getByRole('link', {name: /w t w/i});
    expect(link).toBeInTheDocument();
    await userEvent.click(link);
    expect(history.location.pathname).toBe(AppRoutes.Main);
  });
});
