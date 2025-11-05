import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../src/components/AuthForm';

vi.mock('../src/firebase', () => ({
  auth: {},
}));

describe('AuthForm', () => {
  it('renders login form when user is not logged in', () => {
    render(<AuthForm user={null} />);
    expect(screen.getByText('Login')).toBeDefined();
  });

  it('renders user email when logged in', () => {
    const mockUser = { email: 'test@example.com' };
    render(<AuthForm user={mockUser} />);
    expect(screen.getByText(/test@example.com/)).toBeDefined();
  });

  it('toggles between login and signup', () => {
    render(<AuthForm user={null} />);
    const toggleButton = screen.getByText('Sign Up');
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Already have an account/)).toBeDefined();
  });
});
