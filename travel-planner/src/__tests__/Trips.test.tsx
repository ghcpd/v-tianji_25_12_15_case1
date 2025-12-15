import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Trips from '../components/Trips';

test('renders trips', () => {
  render(<Trips />);
  expect(screen.getByText('My Trips')).toBeInTheDocument();
});

test('can add a trip', () => {
  render(<Trips />);
  fireEvent.change(screen.getByPlaceholderText('Trip Name'), { target: { value: 'Test Trip' } });
  fireEvent.change(screen.getByPlaceholderText('Destination'), { target: { value: 'Paris' } });
  fireEvent.click(screen.getByText('Add Trip'));
  expect(screen.getByText('Test Trip')).toBeInTheDocument();
});