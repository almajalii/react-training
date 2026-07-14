import { render, screen, fireEvent } from '@testing-library/react'
import BookingCard from './BookingCard'

// Replace the real translation hook with a fake one for this test file only
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: { language: 'en' },
  }),
}))

const mockBooking = {
  id: '1',
  status: 'Accepted',
  professionalName: 'Ahmad Khalil',
  serviceName: 'Circuit Repair',
  servicePrice: '50 – 60 JD',
  scheduledDate: '2026-07-04',
  scheduledTime: '14:30',
  address: 'Abdoun, Amman',
}

describe('BookingCard', () => {
  test('renders the service name', () => {
    render(<BookingCard booking={mockBooking} onClick={() => {}} />)
    expect(screen.getByText('Circuit Repair')).toBeInTheDocument()
  })

  test('renders the professional name', () => {
    render(<BookingCard booking={mockBooking} onClick={() => {}} />)
    expect(screen.getByText('Ahmad Khalil')).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<BookingCard booking={mockBooking} onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
