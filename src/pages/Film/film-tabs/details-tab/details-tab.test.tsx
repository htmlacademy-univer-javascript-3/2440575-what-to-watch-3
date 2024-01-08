import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import DetailsTab from './index.tsx';
import { mockFilmDetails } from '../../../../utils/mock-data.ts';

describe('Component: DetailsTab', () => {
  const mockFilmData = mockFilmDetails();

  it('should render correctly', () => {
    render(<DetailsTab {...mockFilmData} />);
    expect(screen.getByText(/director/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilmData.director)).toBeInTheDocument();
    expect(screen.getByText(/starring/i)).toBeInTheDocument();
    for (const actor of mockFilmData.starring) {
      expect(screen.getByText(actor)).toBeInTheDocument();
    }
    expect(screen.getByText(/genre/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilmData.genre)).toBeInTheDocument();
    expect(screen.getByText(/released/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilmData.released)).toBeInTheDocument();
  });
});
