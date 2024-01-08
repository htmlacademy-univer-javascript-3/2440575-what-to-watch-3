import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import FilmTabs from './index.tsx';
import { mockFilmDetails, mockReviewArray } from '../../../utils/mock-data.ts';
import { FilmPageTabs } from '../../../types/film.ts';
import userEvent from '@testing-library/user-event';

describe('Component: FilmTabs', () => {
  const mockReviews = mockReviewArray();
  const mockFilmData = mockFilmDetails();
  const tabs = Object.keys(FilmPageTabs);

  it('should render correctly', () => {
    render(<FilmTabs reviews={mockReviews} {...mockFilmData} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(tabs.length);
    for (const tab of tabs) {
      expect(screen.getByText(tab)).toBeInTheDocument();
    }
  });

  it('should render overview tab by default', () => {
    render(<FilmTabs reviews={mockReviews} {...mockFilmData} />);
    expect(screen.getByText(/director:/i)).toBeInTheDocument();
    expect(screen.queryByTestId('review-block')).not.toBeInTheDocument();
    expect(screen.queryByText(/genre/i)).not.toBeInTheDocument();
  });

  it('should change active tab to details on item click', async () => {
    render(<FilmTabs reviews={mockReviews} {...mockFilmData} />);
    await userEvent.click(screen.getByText(tabs[1]));
    expect(screen.getByText(/genre/i)).toBeInTheDocument();
    expect(screen.queryByText(/director:/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('review-block')).not.toBeInTheDocument();
  });

  it('should change active tab to reviews on item click', async () => {
    render(<FilmTabs reviews={mockReviews} {...mockFilmData} />);
    await userEvent.click(screen.getByText(tabs[2]));
    expect(screen.getAllByTestId('review-block').length).toBe(mockReviews.length);
    expect(screen.queryByText(/genre/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/director:/i)).not.toBeInTheDocument();
  });
});
