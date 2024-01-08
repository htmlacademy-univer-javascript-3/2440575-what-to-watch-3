import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import DetailsTab from './index.tsx';
import { mockFilmDetails } from '../../../../utils/mock-data.ts';

describe('Component: DetailsTab', () => {
  const mockedFilmDetails = mockFilmDetails();

  it('should render correctly', () => {
    render(<DetailsTab {...mockedFilmDetails} />);
    expect(screen.getByText(/director/i)).toBeInTheDocument();
    expect(screen.getByText(mockedFilmDetails.director)).toBeInTheDocument();
    expect(screen.getByText(/starring/i)).toBeInTheDocument();
    for (const actor of mockedFilmDetails.starring) {
      expect(screen.getByText(actor)).toBeInTheDocument();
    }
    expect(screen.getByText(/genre/i)).toBeInTheDocument();
    expect(screen.getByText(mockedFilmDetails.genre)).toBeInTheDocument();
    expect(screen.getByText(/released/i)).toBeInTheDocument();
    expect(screen.getByText(mockedFilmDetails.released)).toBeInTheDocument();
  });
});
