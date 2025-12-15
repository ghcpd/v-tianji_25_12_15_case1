import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DestinationCard from './DestinationCard'
import { sampleDestinations } from '../data/destinations'

test('renders destination and toggles favorite', async ()=>{
  const user = userEvent.setup()
  const d = sampleDestinations[0]
  let toggled = false
  render(<DestinationCard dest={d} onToggleFavorite={()=>{ toggled = true }} favorite={false} />)
  expect(screen.getByText(d.name)).toBeInTheDocument()
  const btn = screen.getByRole('button')
  await user.click(btn)
  expect(toggled).toBe(true)
})
