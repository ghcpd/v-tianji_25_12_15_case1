import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from '../App'

describe('Travel Planner App (unit)', () => {
  test('renders destination list and can favorite a destination', async () => {
    render(<App />)

    const destList = await screen.findByTestId('destination-list')
    expect(destList).toBeInTheDocument()

    const favButton = screen.getByTestId('fav-paris')
    fireEvent.click(favButton)

    const favSummary = screen.getByTestId('favorites')
    expect(favSummary).toBeInTheDocument()
    const favItem = screen.getByTestId('favorite-paris')
    expect(favItem).toBeInTheDocument()
  })

  test('can create a trip and add an itinerary item', async () => {
    render(<App />)

    const createBtn = screen.getByTestId('create-trip-button')
    fireEvent.click(createBtn)

    const nameInput = screen.getByTestId('trip-name-input')
    const daysInput = screen.getByTestId('trip-days-input')
    const submit = screen.getByTestId('trip-submit')

    fireEvent.change(nameInput, { target: { value: 'Spring Escape' } })
    fireEvent.change(daysInput, { target: { value: 2 } })
    fireEvent.click(submit)

    expect(screen.getByTestId('trips-list')).toHaveTextContent('Spring Escape')

    // select the new trip by finding it inside the trips list to avoid matching the header
    const tripsList = screen.getByTestId('trips-list')
    const tripCard = within(tripsList).getByText('Spring Escape')
    fireEvent.click(tripCard)

    // add itinerary to Day 1: scope queries inside the Day 1 panel to avoid duplicates
    const day1Container = screen.getByTestId('itinerary-day-1').closest('div')
    const placeInput = within(day1Container).getByTestId('add-item-place')
    const timeInput = within(day1Container).getByTestId('add-item-time')
    const addSubmit = within(day1Container).getByTestId('add-item-submit')

    fireEvent.change(placeInput, { target: { value: 'Eiffel Tower visit' } })
    fireEvent.change(timeInput, { target: { value: '10:30' } })
    fireEvent.click(addSubmit)

    const itineraryItem = await screen.findByText('Eiffel Tower visit')
    expect(itineraryItem).toBeInTheDocument()
  })
})
