import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import TripBuilderPage from './TripBuilderPage'

test('can create a trip and show it', async ()=>{
  const user = userEvent.setup()
  render(<MemoryRouter><TripBuilderPage /></MemoryRouter>)
  const input = screen.getByPlaceholderText('Trip name')
  await user.type(input, 'Weekend')
  await user.click(screen.getByRole('button', { name: /create/i }))
  expect(screen.getByText('Weekend')).toBeInTheDocument()
})
