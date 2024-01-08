import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import OverviewTab from './index.tsx';
import { mockFilmDetails } from '../../../../utils/mock-data.ts';

describe('Component: OverviewTab', () => {
  const mockFilmData = mockFilmDetails();

  it('should render correctly', () => {
    render(<OverviewTab {...mockFilmData} />);
    expect(screen.getByText(/director:/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockFilmData.director))).toBeInTheDocument();
    expect(screen.getByText(/starring:/i)).toBeInTheDocument();
    for (const actor of mockFilmData.starring) {
      expect(screen.getByText(new RegExp(actor))).toBeInTheDocument();
    }
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockFilmData.scoresCount.toString()))).toBeInTheDocument();
    expect(screen.getByText(mockFilmData.description)).toBeInTheDocument();
  });
});
