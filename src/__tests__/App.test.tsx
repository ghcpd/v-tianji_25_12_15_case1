import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

beforeEach(() => localStorage.clear())

test('renders title and destinations', () => {
  render(<App />)
  expect(screen.getByText(/Travel Planner/i)).toBeInTheDocument()
  expect(screen.getByText(/Kyoto/)).toBeInTheDocument()
})

test('can save favorite and persist', async () => {
  const { unmount } = render(<App />)
  const btn = screen.getByRole('button', { name: /fav-1/i })
  await userEvent.click(btn)
  expect(btn).toHaveTextContent(/Saved/)
  // unmount and re-render to validate persistence via localStorage
  unmount()
  render(<App />)
  expect(screen.getByRole('button', { name: /fav-1/i })).toHaveTextContent(/Saved/)
})

test('create trip flow', async () => {
  render(<App />)
  const input = screen.getByRole('textbox', { name: /trip-name/i })
  const create = screen.getByRole('button', { name: /create/i })
  await userEvent.type(input, 'Weekend in Kyoto')
  await userEvent.click(create)
  expect(screen.getByText(/Weekend in Kyoto/)).toBeInTheDocument()
})

import { within } from '@testing-library/react'

test('handles unknown favorite ids gracefully', () => {
  // simulate stale localStorage that contains an unknown favorite id
  localStorage.setItem('favorites', JSON.stringify(['999', '1']))
  render(<App />)
  // find the Favorites region and assert it contains Kyoto
  const favHeading = screen.getByRole('heading', { name: /Favorites/i })
  const favRegion = favHeading.parentElement!
  expect(within(favRegion!).getByText(/Kyoto/)).toBeInTheDocument()
  // unknown id should be ignored (no item showing "999")
  expect(screen.queryByText(/999/)).not.toBeInTheDocument()
})
