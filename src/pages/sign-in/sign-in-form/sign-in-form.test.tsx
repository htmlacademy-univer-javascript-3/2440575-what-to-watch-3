import { render, screen } from '@testing-library/react';
import SignInForm from './index.tsx';
import { withProviders } from '../../../utils/mock-component.tsx';

describe('Component: SignInForm', () => {
  it('should render correctly', () => {
    const {component} = withProviders(<SignInForm />);
    render(component);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
  });
});
