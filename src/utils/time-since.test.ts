import timeSince from './time-since'

/**
 * test scenarios for the timeSince function
 * - should return seconds for a date less than a minute ago
 * - should return minutes for a date 1 minute ago
 * - should return hours for a date 1 hour ago
 * - should return days for a date 1 day ago
 * - should return months for a date 1 month ago
 * - should return years for a date 1 year ago
 */
describe('timeSince function', () => {
  it('should return seconds for a date less than a minute ago', () => {
    const date = new Date()
    expect(timeSince(new Date(date.getTime() - 30000))).toBe('30 s')
  })

  it('should return minutes for a date 1 minute ago', () => {
    const date = new Date()
    expect(timeSince(new Date(date.getTime() - 60000))).toBe('1 min')
  })

  it('should return hours for a date 1 hour ago', () => {
    const date = new Date()
    expect(timeSince(new Date(date.getTime() - 3600000))).toBe('1 h')
  })

  it('should return days for a date 1 day ago', () => {
    const date = new Date()
    expect(timeSince(new Date(date.getTime() - 86400000))).toBe('1 d')
  })

  it('should return months for a date 1 month ago', () => {
    const date = new Date()
    expect(timeSince(new Date(date.getTime() - 2592000000))).toBe('1 mon')
  })

  it('should return years for a date 1 year ago', () => {
    const date = new Date()
    expect(timeSince(new Date(date.getTime() - 31536000000))).toBe('1 y')
  })
})
