// createBooking.ts imports 4 things from files we haven't converted or verified —
// mock all 4 so the test never touches the real apiConfig.js (which crashes Jest
// via import.meta.env) or the real network.
jest.mock('../../config/apiConfig', () => ({
  API_BASE_URL: 'https://api.test',
}))

jest.mock('../../config/apiConstants', () => ({
  HttpMethod: { POST: 'POST' },
}))

jest.mock('../../http/requestInterceptor', () => ({
  buildHeaders: jest.fn(() => ({ Authorization: 'Bearer fake-token' })),
}))

// Assumption, unverified against the real file: handleResponse throws on a
// failed response and otherwise returns the parsed JSON body.
jest.mock('../../http/responseInterceptor', () => ({
  handleResponse: jest.fn(async (resPromise: Promise<Response>) => {
    const res = await resPromise
    if (!res.ok) throw new Error('Request failed')
    return res.json()
  }),
}))

import createBooking from './createBooking'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
import type { NewBooking } from '../../../types/booking'

const mockPayload: NewBooking = {
  professionalId: 'pro1',
  serviceName: 'Circuit Repair',
  servicePrice: '50 – 60 JD',
  scheduledDate: '2026-07-06',
  scheduledTime: '11:00',
  address: 'Abdoun, Amman',
  description: 'Fix the panel',
  imageUrls: [],
}

beforeEach(() => {
  jest.clearAllMocks()
  window.fetch = jest.fn()
})

describe('createBooking', () => {
  test('calls fetch with the correct URL, method, and body', async () => {
    ;(window.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'b1' }),
    })

    await createBooking(mockPayload)

    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.test/bookings',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockPayload),
      })
    )
  })

  test('sends the headers built by buildHeaders', async () => {
    ;(window.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => ({}) })

    await createBooking(mockPayload)

    expect(buildHeaders).toHaveBeenCalledWith(true)
    expect(window.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } })
    )
  })

  test('returns the parsed booking on success', async () => {
    ;(window.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'b1', status: 'Pending' }),
    })

    const result = await createBooking(mockPayload)

    expect(result).toEqual({ id: 'b1', status: 'Pending' })
  })

  test('throws when the response is not ok', async () => {
    ;(window.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Bad request' }),
    })

    await expect(createBooking(mockPayload)).rejects.toThrow()
  })
})
