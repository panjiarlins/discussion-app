/**
 * Calculate the time interval since the given date and return a human-readable string representation of the time.
 *
 * @param {Date} date - the date to calculate the time interval from
 * @return {string} a human-readable string representation of the time interval
 */
export default function timeSince(date: Date): string {
  const seconds: number = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds >= 31536000) return `${Math.floor(seconds / 31536000)} y`
  if (seconds >= 2592000) return `${Math.floor(seconds / 2592000)} mon`
  if (seconds >= 86400) return `${Math.floor(seconds / 86400)} d`
  if (seconds >= 3600) return `${Math.floor(seconds / 3600)} h`
  if (seconds >= 60) return `${Math.floor(seconds / 60)} min`

  return `${Math.floor(seconds)} s`
}
