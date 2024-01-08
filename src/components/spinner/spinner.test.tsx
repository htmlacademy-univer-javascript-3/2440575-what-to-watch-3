import { render, screen } from '@testing-library/react';
import Spinner from './index.tsx';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
