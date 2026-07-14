import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useFormik } from 'formik'
import BookingStep1 from './BookingStep1'
import { step1Schema } from '../../../../screens/createBooking/createBookingValidation'
import type { TFunction } from 'i18next'
import type { BookingProService } from '../../../../types/booking'
import '@testing-library/jest-dom'

const t = ((key: string) => key) as unknown as TFunction

const mockPro = {
  id: 'pro1',
  name: 'Ahmad',
  category: 'Electrician',
  services: [
    { serviceId: 1, name: 'Circuit Repair', nameAr: 'إصلاح', minPrice: 50, maxPrice: 60 },
    { serviceId: 2, name: 'Wiring', minPrice: 40 },
  ],
}

// Wraps BookingStep1 with a REAL Formik instance, same as useCreateBooking does
// in production — this is what lets typing/blurring actually behave correctly.
function renderStep1({
  withValidation = false,
  image = null,
  selectService = jest.fn(),
  addImage = jest.fn(),
  removeImage = jest.fn(),
}: {
  withValidation?: boolean
  image?: { uri: string; file: File } | null
  selectService?: (svc: BookingProService) => void
  addImage?: (file: File) => void
  removeImage?: () => void
} = {}) {
  function Wrapper() {
    const formik = useFormik({
      initialValues: {
        serviceName: '',
        serviceNameAr: '',
        servicePrice: '',
        description: '',
        scheduledDate: '',
        scheduledTime: '',
        address: '',
        addressId: '',
      },
      validationSchema: withValidation ? step1Schema(t) : undefined,
      onSubmit: () => {},
    })
    return (
      <BookingStep1
        pro={mockPro}
        formik={formik}
        image={image}
        selectService={selectService}
        addImage={addImage}
        removeImage={removeImage}
        t={t}
        i18n={{ language: 'en' }}
      />
    )
  }
  return render(<Wrapper />)
}

describe('BookingStep1 — description textarea', () => {
  test('typing updates the controlled value', async () => {
    renderStep1()
    const textarea = screen.getByPlaceholderText('booking_description_placeholder')

    await userEvent.type(textarea, 'Fix the panel')

    expect(textarea).toHaveValue('Fix the panel')
  })

  test('shows a validation error after leaving the field empty', async () => {
    renderStep1({ withValidation: true })
    const textarea = screen.getByPlaceholderText('booking_description_placeholder')

    fireEvent.blur(textarea)

    await waitFor(() => {
      expect(screen.getByText('booking_val_description_required')).toBeInTheDocument()
    })
  })
})

describe('BookingStep1 — service selection', () => {
  test('clicking a service card calls selectService with the right service', () => {
    const selectService = jest.fn()
    renderStep1({ selectService })

    fireEvent.click(screen.getByText('Circuit Repair'))

    expect(selectService).toHaveBeenCalledWith(expect.objectContaining({ serviceId: 1, name: 'Circuit Repair' }))
  })

  test('shows the "from" price format when only minPrice exists', () => {
    renderStep1()
    expect(screen.getByText('browse_from 40 JD')).toBeInTheDocument()
  })
})

describe('BookingStep1 — photo upload', () => {
  test('selecting a file calls addImage with that file', async () => {
    const addImage = jest.fn()
    const { container } = renderStep1({ addImage })

    const file = new File(['x'], 'photo.jpg', { type: 'image/jpeg' })
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement

    await userEvent.upload(fileInput, file)

    expect(addImage).toHaveBeenCalledWith(file)
  })

  test('shows a remove button when an image is present, and calls removeImage on click', () => {
    const removeImage = jest.fn()
    renderStep1({
      image: { uri: 'blob:fake', file: new File([], 'x.jpg') },
      removeImage,
    })

    fireEvent.click(screen.getByLabelText('Remove photo'))

    expect(removeImage).toHaveBeenCalledTimes(1)
  })
})
