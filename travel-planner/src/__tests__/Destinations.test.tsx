import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider } from '../context/FavoritesContext';
import Destinations from '../components/Destinations';

test('renders destinations', () => {
  render(
    <FavoritesProvider>
      <Destinations />
    </FavoritesProvider>
  );
  expect(screen.getByText('Browse Destinations')).toBeInTheDocument();
  expect(screen.getByText('Paris')).toBeInTheDocument();
});

test('can favorite a destination', () => {
  render(
    <FavoritesProvider>
      <Destinations />
    </FavoritesProvider>
  );
  const favoriteButton = screen.getAllByText('Favorite')[0];
  fireEvent.click(favoriteButton);
  expect(screen.getByText('Unfavorite')).toBeInTheDocument();
});