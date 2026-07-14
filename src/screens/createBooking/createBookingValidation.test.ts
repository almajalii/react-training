import type { TFunction } from 'i18next'
import { step1Schema, step2Schema } from './createBookingValidation'

const t = ((key: string) => key) as unknown as TFunction

describe('step1Schema', () => {
  const schema = step1Schema(t)

  test('passes with a valid serviceName and description', async () => {
    const isValid = await schema.isValid({
      serviceName: 'Circuit Repair',
      description: 'Fix the panel',
    })
    expect(isValid).toBe(true)
  })

  test('fails when serviceName is missing', async () => {
    const isValid = await schema.isValid({ serviceName: '', description: 'Fix the panel' })
    expect(isValid).toBe(false)
  })

  test('fails when description is shorter than 6 characters', async () => {
    const isValid = await schema.isValid({ serviceName: 'Circuit Repair', description: 'Fix' })
    expect(isValid).toBe(false)
  })

  test('reports the correct error message for a missing serviceName', async () => {
    try {
      await schema.validate({ serviceName: '', description: 'Fix the panel' }, { abortEarly: false })
      throw new Error('Expected validation to fail, but it passed')
    } catch (err: any) {
      expect(err.errors).toContain('booking_val_service_required')
    }
  })
})

describe('step2Schema', () => {
  const schema = step2Schema(t)

  test('passes with a valid date, time, and address', async () => {
    const isValid = await schema.isValid({
      scheduledDate: '2026-07-06',
      scheduledTime: '11:00',
      address: 'Abdoun, Amman',
    })
    expect(isValid).toBe(true)
  })

  test('fails when address is shorter than 3 characters', async () => {
    const isValid = await schema.isValid({
      scheduledDate: '2026-07-06',
      scheduledTime: '11:00',
      address: 'Ab',
    })
    expect(isValid).toBe(false)
  })

  test('fails when scheduledDate is missing', async () => {
    const isValid = await schema.isValid({
      scheduledDate: '',
      scheduledTime: '11:00',
      address: 'Abdoun, Amman',
    })
    expect(isValid).toBe(false)
  })

  test('reports all missing fields at once with abortEarly false', async () => {
    try {
      await schema.validate({ scheduledDate: '', scheduledTime: '', address: '' }, { abortEarly: false })
      throw new Error('Expected validation to fail, but it passed')
    } catch (err: any) {
      expect(err.errors).toEqual(
        expect.arrayContaining([
          'booking_val_date_required',
          'booking_val_time_required',
          'booking_val_address_required',
        ])
      )
    }
  })
})
