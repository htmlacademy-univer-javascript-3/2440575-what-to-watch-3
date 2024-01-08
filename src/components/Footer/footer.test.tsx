import { render, screen } from '@testing-library/react';
import { withProviders } from '../../utils/mock-component.tsx';
import Footer from './index.tsx';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '../../types/routes.ts';

describe('Component: Footer', () => {
  it('should render correctly', async () => {
    const { component, history } = withProviders(<Footer />);
    render(component);
    const link = screen.getByRole('link', {name: /w t w/i});
    expect(link).toBeInTheDocument();
    await userEvent.click(link);
    expect(history.location.pathname).toBe(AppRoutes.Main);
  });
});
