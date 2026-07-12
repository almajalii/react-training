//5 mocks
//1 router & navigation
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: 'pro1' }),
  useNavigate: () => jest.fn(),
}))
//2 translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}))
//3 validation
jest.mock('./createBookingValidation', () => ({
  step1Schema: () => null,
  step2Schema: () => null,
}))
//4 network layer
jest.mock('../../network/api', () => ({
  getProfessional: jest.fn(),
  getBookedSlots: jest.fn(),
  createBooking: jest.fn(),
  uploadBookingImages: jest.fn(),
  getAddresses: jest.fn(),
}))
//5 react-query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

// imports must come after the mocks above, so the hook receives the fakes
import { renderHook, act } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
// @ts-expect-error
import { createBooking, uploadBookingImages } from '../../network/api'
import useCreateBooking from './useCreateBooking'

// mock data
const mockPro = {
  id: 'pro1',
  name: 'Ahmad',
  category: 'Electrician',
  workingHours: [{ day: 'Monday', openTime: '09:00', closeTime: '17:00' }],
}

const mondaySlot = { iso: '2026-07-06', label: 'Mon', num: 6, month: 'Jul', fullDay: 'Monday' }
const sundaySlot = { iso: '2026-07-05', label: 'Sun', num: 5, month: 'Jul', fullDay: 'Sunday' }

// jest lifecycle method that runs before each test in the suite
// 1. clears call history + any resolved/rejected values from the previous test
// 2. re-teaches the fake useQuery to return mock data for specific query keys
beforeEach(() => {
  jest.clearAllMocks()
  ;(useQuery as jest.Mock).mockImplementation(({ queryKey }: any) => {
    switch (queryKey[0]) {
      case 'professional':
        return { data: mockPro, isLoading: false }
      case 'addresses':
        return { data: [] }
      case 'bookedSlots':
        return { data: ['10:00'] }
      default:
        return { data: undefined }
    }
  })
})

// tests for the availability logic in useCreateBooking
describe('useCreateBooking — isDayUnavailable', () => {
  test('a day the pro works is available', () => {
    const { result } = renderHook(() => useCreateBooking())

    expect(result.current.isDayUnavailable(mondaySlot)).toBe(false)
  })

  test('a day the pro does not work is unavailable', () => {
    const { result } = renderHook(() => useCreateBooking())

    expect(result.current.isDayUnavailable(sundaySlot)).toBe(true)
  })
})

describe('useCreateBooking — isTimeUnavailable', () => {
  test('a slot already booked by someone else is unavailable', () => {
    const { result } = renderHook(() => useCreateBooking())

    expect(result.current.isTimeUnavailable('10:00')).toBe(true)
  })

  test('a free slot is available when no date has been selected yet', () => {
    const { result } = renderHook(() => useCreateBooking())

    expect(result.current.isTimeUnavailable('11:00')).toBe(false)
  })
})

// tests for selectService — builds the price string, sets formik fields
describe('useCreateBooking — selectService', () => {
  test('sets serviceName and a formatted price range', () => {
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectService({ serviceId: 1, name: 'Circuit Repair', minPrice: 50, maxPrice: 60 })
    })

    expect(result.current.formik.values.serviceName).toBe('Circuit Repair')
    expect(result.current.formik.values.servicePrice).toBe('50 – 60 JD')
  })

  test('falls back to "from" pricing when only minPrice exists', () => {
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectService({ serviceId: 2, name: 'Wiring', minPrice: 40 })
    })

    // t() is mocked to echo its key, so 'browse_from' shows up literally
    expect(result.current.formik.values.servicePrice).toBe('browse_from 40 JD')
  })
})

// tests for selectDate — sets the date, resets the time, respects availability
describe('useCreateBooking — selectDate', () => {
  test('sets scheduledDate and clears scheduledTime', () => {
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectTime('09:30') // pretend a time was already picked
      result.current.selectDate(mondaySlot)
    })

    expect(result.current.formik.values.scheduledDate).toBe(mondaySlot.iso)
    expect(result.current.formik.values.scheduledTime).toBe('')
  })

  test('does nothing when the day is unavailable', () => {
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectDate(sundaySlot)
    })

    expect(result.current.formik.values.scheduledDate).toBe('')
  })
})

// test for selectAddress — joins the address parts into one display string
describe('useCreateBooking — selectAddress', () => {
  test('joins the address parts and stores the id', () => {
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectAddress({
        id: 'addr1',
        area: 'Abdoun',
        street: 'Street 12',
        buildingName: 'Building A',
        apartmentNumber: '4',
      })
    })

    expect(result.current.formik.values.address).toBe('Abdoun, Street 12, Building A, Apt 4')
    expect(result.current.formik.values.addressId).toBe('addr1')
  })
})

// test for handleContinue — advances the step when nothing blocks it
describe('useCreateBooking — handleContinue', () => {
  test('advances from step 1 to step 2 when there is no blocking validation', async () => {
    const { result } = renderHook(() => useCreateBooking())

    await act(async () => {
      await result.current.handleContinue()
    })

    expect(result.current.step).toBe(2)
  })
})

// tests for the submit flow — success, failure, and image upload
describe('useCreateBooking — submit', () => {
  test('creates the booking and advances to step 4 on success', async () => {
    ;(createBooking as jest.Mock).mockResolvedValue({ id: 'b1' })
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectService({ serviceId: 1, name: 'Circuit Repair', minPrice: 50, maxPrice: 60 })
    })

    await act(async () => {
      await result.current.formik.submitForm()
    })

    expect(createBooking).toHaveBeenCalledWith(
      expect.objectContaining({ professionalId: 'pro1', serviceName: 'Circuit Repair' })
    )
    expect(result.current.step).toBe(4)
  })

  test('does not advance the step when createBooking fails', async () => {
    ;(createBooking as jest.Mock).mockRejectedValue(new Error('network error'))
    const { result } = renderHook(() => useCreateBooking())

    await act(async () => {
      await result.current.formik.submitForm()
    })

    expect(result.current.step).toBe(1)
  })

  test('uploads the image before creating the booking, when one is attached', async () => {
    ;(uploadBookingImages as jest.Mock).mockResolvedValue(['https://example.com/photo.jpg'])
    ;(createBooking as jest.Mock).mockResolvedValue({ id: 'b1' })
    const fakeFile = new File(['x'], 'photo.jpg', { type: 'image/jpeg' })
    window.URL.createObjectURL = jest.fn(() => 'blob:fake')
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.addImage(fakeFile)
    })

    await act(async () => {
      await result.current.formik.submitForm()
    })

    expect(uploadBookingImages).toHaveBeenCalledWith([fakeFile])
    expect(createBooking).toHaveBeenCalledWith(
      expect.objectContaining({ imageUrls: ['https://example.com/photo.jpg'] })
    )
  })
})

// tests for selectTime — blocks unavailable times, sets available ones
describe('useCreateBooking — selectTime', () => {
  test('does not set scheduledTime when the slot is already booked', () => {
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectTime('10:00') // '10:00' is in the mocked bookedSlots
    })

    expect(result.current.formik.values.scheduledTime).toBe('')
  })

  test('sets scheduledTime when the slot is free', () => {
    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.selectTime('11:00')
    })

    expect(result.current.formik.values.scheduledTime).toBe('11:00')
  })
})

// test for removeImage — clears the image and revokes its blob URL
describe('useCreateBooking — removeImage', () => {
  test('clears the image and revokes the object URL', () => {
    window.URL.createObjectURL = jest.fn(() => 'blob:fake')
    window.URL.revokeObjectURL = jest.fn()
    const fakeFile = new File(['x'], 'photo.jpg', { type: 'image/jpeg' })

    const { result } = renderHook(() => useCreateBooking())

    act(() => {
      result.current.addImage(fakeFile)
    })
    expect(result.current.image).not.toBeNull()

    act(() => {
      result.current.removeImage()
    })

    expect(result.current.image).toBeNull()
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:fake')
  })
})

// tests that need control over "today", since dateSlots depends on new Date()
describe('useCreateBooking — with a fixed system date', () => {
  beforeEach(() => {
    // 2026-07-06 is a Monday — matches mockPro's working hours (09:00–17:00)
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-07-06T08:00:00'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('isTimeUnavailable returns true for a time outside working hours', () => {
    const { result } = renderHook(() => useCreateBooking())
    const today = result.current.dateSlots[0] // real slot for 2026-07-06

    act(() => {
      result.current.selectDate(today)
    })

    expect(result.current.isTimeUnavailable('20:00')).toBe(true)
  })

  test('isTimeUnavailable returns false for a free time inside working hours', () => {
    const { result } = renderHook(() => useCreateBooking())
    const today = result.current.dateSlots[0]

    act(() => {
      result.current.selectDate(today)
    })

    expect(result.current.isTimeUnavailable('11:00')).toBe(false)
  })

  test('selectedDateLabel reflects the chosen date', () => {
    const { result } = renderHook(() => useCreateBooking())
    const today = result.current.dateSlots[0]

    act(() => {
      result.current.selectDate(today)
    })

    expect(result.current.selectedDateLabel).toBe(`${today.label}, ${today.month} ${today.num}`)
  })
})
