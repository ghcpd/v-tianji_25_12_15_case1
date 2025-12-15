import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FavoritesProvider } from '../context/FavoritesContext';
import Favorites from '../components/Favorites';

test('renders favorites', () => {
  render(
    <FavoritesProvider>
      <Favorites />
    </FavoritesProvider>
  );
  expect(screen.getByText('My Favorite Places')).toBeInTheDocument();
});