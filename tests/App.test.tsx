import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

vi.mock('../src/firebase', () => ({
  auth: {
    onAuthStateChanged: vi.fn((callback: any) => {
      callback(null);
      return vi.fn();
    }),
  },
  db: {},
}));

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/FFF Application/i)).toBeDefined();
  });

  it('renders firebase integration text', () => {
    render(<App />);
    expect(screen.getByText(/Firebase \+ React \+ Vite/i)).toBeDefined();
  });
});
