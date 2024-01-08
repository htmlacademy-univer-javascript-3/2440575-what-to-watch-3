import { render, screen, waitFor } from '@testing-library/react';
import SignInForm from './index.tsx';
import { withProviders } from '../../../utils/mock-component.tsx';
import { StatusCodes } from 'http-status-codes';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { extractActionsTypes } from '../../../utils/mock-reducer.ts';
import { signIn } from '../../../store/api-actions.ts';
import { mockUserCredentials } from '../../../utils/mock-data.ts';

describe('Component: SignInForm', () => {
  const mockUser = mockUserCredentials();

  it('should render correctly', () => {
    const {component} = withProviders(<SignInForm />);
    render(component);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /sign in/i})).toBeDisabled();
  });

  it('should sign in', async () => {
    const {component, mockAxiosAdapter, mockStore} = withProviders(<SignInForm />);
    mockAxiosAdapter.onPost(/\/login/).reply(StatusCodes.OK, {token: ''});
    render(component);
    await userEvent.type(screen.getByLabelText(/email address/i), mockUser.email);
    await userEvent.type(screen.getByLabelText(/password/i), mockUser.password);
    await waitFor(() => expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled());
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      signIn.pending.type,
      signIn.fulfilled.type,
    ]));
  });

  it('should validate email presence', async () => {
    const {component} = withProviders(<SignInForm />);
    render(component);
    await userEvent.type(screen.getByLabelText(/password/i), mockUser.password);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  it('should validate password presence', async () => {
    const {component} = withProviders(<SignInForm />);
    render(component);
    await userEvent.type(screen.getByLabelText(/email address/i), mockUser.email);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  it('should validate email content', async () => {
    const invalidEmail = 'word';
    const {component} = withProviders(<SignInForm />);
    render(component);
    await userEvent.type(screen.getByLabelText(/email address/i), invalidEmail);
    await userEvent.type(screen.getByLabelText(/password/i), mockUser.password);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    await userEvent.clear(screen.getByLabelText(/email/i));
    await userEvent.type(screen.getByLabelText(/email/i), mockUser.email);
    await waitFor(() => expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled());
  });

  it('should validate password content', async () => {
    const firstInvalidPassword = 'word';
    const secondInvalidPassword = '_1_';
    const {component} = withProviders(<SignInForm />);
    render(component);
    await userEvent.type(screen.getByLabelText(/password/i), firstInvalidPassword);
    await userEvent.type(screen.getByLabelText(/email address/i), mockUser.email);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    await userEvent.clear(screen.getByLabelText(/password/i));
    await userEvent.type(screen.getByLabelText(/password/i), secondInvalidPassword);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    await userEvent.clear(screen.getByLabelText(/password/i));
    await userEvent.type(screen.getByLabelText(/password/i), mockUser.password);
    await waitFor(() => expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled());
  });
});
