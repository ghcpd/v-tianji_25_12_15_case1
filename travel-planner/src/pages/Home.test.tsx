import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home page', () => {
  it('renders welcome message and description', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Travel Planner');
    expect(screen.getByText(/Browse destinations, plan trips, and save favorites./i)).toBeInTheDocument();
  });
});
