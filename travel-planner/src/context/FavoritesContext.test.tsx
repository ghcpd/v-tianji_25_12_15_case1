import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFavorites, FavoritesProvider } from './FavoritesContext';

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  return (
    <div>
      <div data-testid="count">{favorites.length}</div>
      <button onClick={() => addFavorite({ id: '1', name: 'First' })}>Add</button>
      <button onClick={() => removeFavorite('1')}>Remove</button>
    </div>
  );
};

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('adds and removes favorites', async () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );
    await userEvent.click(screen.getByText('Add'));
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('1'));
    await userEvent.click(screen.getByText('Remove'));
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('0'));
  });

  it('persists favorites to localStorage', async () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );
    await userEvent.click(screen.getByText('Add'));
    await waitFor(() => expect(localStorage.getItem('favorites')).toBe(JSON.stringify([{ id: '1', name: 'First' }])));
  });
});
