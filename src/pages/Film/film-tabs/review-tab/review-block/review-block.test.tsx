import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import ReviewBlock from './index.tsx';
import { mockReview } from '../../../../../utils/mock-data.ts';
import { formatDate } from '../../../../../utils/format.ts';
import { DateFormats } from '../../../../../types/date.ts';

describe('Component: ReviewBlock', () => {
  const mockReviewDetails = mockReview();

  it('should render correctly', () => {
    render(<ReviewBlock {...mockReviewDetails} />);
    expect(screen.getByTestId('review-block')).toBeInTheDocument();
    expect(screen.getByText(mockReviewDetails.comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviewDetails.rating)).toBeInTheDocument();
    expect(screen.getByText(mockReviewDetails.user)).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockReviewDetails.date, DateFormats.Standard))).toBeInTheDocument();
  });
});
