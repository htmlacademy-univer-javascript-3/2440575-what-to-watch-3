import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import AddReviewForm from './index.tsx';
import { withProviders } from '../../../utils/mock-component.tsx';
import { RATING_OPTIONS_COUNT } from '../../../constants/review.ts';

describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    const { component } = withProviders(<AddReviewForm />);
    render(component);
    expect(screen.getByPlaceholderText(/review text/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/rating/i).length).toBe(RATING_OPTIONS_COUNT);
    expect(screen.getByRole('button', {name: /post/i})).toBeDisabled();
  });
});
