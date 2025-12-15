import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FavoritesProvider } from '../context/FavoritesContext';
import App from '../App';

test('renders Travel Planner title', () => {
  render(
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  );
  const linkElement = screen.getByText('Travel Planner');
  expect(linkElement).toBeInTheDocument();
});