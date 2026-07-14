import { timelineDone, toMinutes, isWithinWorkingHours, formatBookingDate } from './bookingUtils'
// Test cases for the toMinutes function
describe('toMinutes', () => {
  test('converts a 12-hour time string to minutes since midnight', () => {
    // Arrange
    const input = '2:30 PM'

    // Act
    const result = toMinutes(input)

    // Assert
    expect(result).toBe(870) // 14:30 → 14*60 + 30 = 870
  })

  test('converts a 24-hour time string to minutes since midnight', () => {
    expect(toMinutes('09:15')).toBe(555) // 9*60 + 15 = 555
  })

  test('returns null for null input', () => {
    expect(toMinutes(null)).toBeNull()
  })

  test('returns null for an empty string', () => {
    expect(toMinutes('')).toBeNull()
  })

  test('returns null for an unrecognized format', () => {
    expect(toMinutes('not a time')).toBeNull()
  })
})
// Test cases for the timelineDone function
describe('timelineDone', () => {
  test('returns true when the step is earlier than the current status', () => {
    expect(timelineDone('Arrived', 'Pending')).toBe(true)
  })

  test('returns true when the step equals the current status', () => {
    expect(timelineDone('Accepted', 'Accepted')).toBe(true)
  })

  test('returns false when the step is later than the current status', () => {
    expect(timelineDone('Pending', 'Completed')).toBe(false)
  })
})
// Test cases for the isWithinWorkingHours function
describe('isWithinWorkingHours', () => {
  test('returns true when the time slot is within working hours', () => {
    expect(isWithinWorkingHours('10:00', '09:00', '17:00')).toBe(true)
  })

  test('returns false when the time slot is outside working hours', () => {
    expect(isWithinWorkingHours('18:00', '09:00', '17:00')).toBe(false)
  })
  test('returns false when the time slot is outside working hours', () => {
    expect(isWithinWorkingHours('18:00', '00:00', '17:00')).toBe(false)
  })
  test('returns true when the time slot exactly matches closing time', () => {
    expect(isWithinWorkingHours('17:00', '09:00', '17:00')).toBe(true)
  })

  test('returns true when working hours are unknown', () => {
    expect(isWithinWorkingHours('10:00', null, null)).toBe(true)
  })
})
// Test cases for the formatBookingDate function
describe('formatBookingDate', () => {
  test('returns an em dash when scheduledDate is null', () => {
    expect(formatBookingDate(null, false)).toBe('—')
  })

  test('returns a short English date by default', () => {
    expect(formatBookingDate('2026-07-04', false)).toBe('4 Jul 2026')
  })

  test('returns a long English date when short is false', () => {
    expect(formatBookingDate('2026-07-04', false, false)).toBe('Saturday, 4 July 2026')
  })

  test('returns a short Arabic date when isAr is true', () => {
    expect(formatBookingDate('2026-07-04', true)).toBe('٤ تموز ٢٠٢٦')
  })

  test('returns a long Arabic date when isAr is true and short is false', () => {
    expect(formatBookingDate('2026-07-04', true, false)).toBe('السبت، ٤ تموز ٢٠٢٦')
  })
})
