import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { mockReviewArray } from '../../../../utils/mock-data.ts';
import ReviewTab from './index.tsx';

describe('Component: ReviewTab', () => {
  const mockReviews = mockReviewArray();

  it('should render correctly', () => {
    render(<ReviewTab reviews={mockReviews} />);
    const reviewBlocks = screen.getAllByTestId('review-block');
    expect(reviewBlocks.length).toBe(mockReviews.length);
  });
});
