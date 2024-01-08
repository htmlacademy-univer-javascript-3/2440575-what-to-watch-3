import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import OverviewTab from './index.tsx';
import { mockFilmDetails } from '../../../../utils/mock-data.ts';

describe('Component: OverviewTab', () => {
  const mockedFilmDetails = mockFilmDetails();

  it('should render correctly', () => {
    render(<OverviewTab {...mockedFilmDetails} />);
    expect(screen.getByText(/director:/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockedFilmDetails.director))).toBeInTheDocument();
    expect(screen.getByText(/starring:/i)).toBeInTheDocument();
    for (const actor of mockedFilmDetails.starring) {
      expect(screen.getByText(new RegExp(actor))).toBeInTheDocument();
    }
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockedFilmDetails.scoresCount.toString()))).toBeInTheDocument();
    expect(screen.getByText(mockedFilmDetails.description)).toBeInTheDocument();
  });
});
