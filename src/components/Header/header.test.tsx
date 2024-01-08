import { render, screen } from '@testing-library/react';
import Header from './index.tsx';
import { withProviders } from '../../utils/mock-component.tsx';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const { component } = withProviders(
      <Header>
        <Header.Logo />
      </Header>
    );
    render(component);
    expect(screen.getByRole('link', { name: /w t w/i })).toBeInTheDocument();
  });
});
