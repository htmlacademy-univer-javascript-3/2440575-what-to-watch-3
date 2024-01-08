import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { mockReviewArray } from '../../../../utils/mock-data.ts';
import ReviewTab from './index.tsx';

describe('Component: ReviewTab', () => {
  const mockedReviews = mockReviewArray();

  it('should render correctly', () => {
    render(<ReviewTab reviews={mockedReviews} />);
    const reviewBlocks = screen.getAllByTestId('review-block');
    expect(reviewBlocks.length).toBe(mockedReviews.length);
  });
});
