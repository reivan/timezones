export function addHours (h1, h2) {
  const sum = h1 + h2
  return (sum + 24) % 24
}

export function formatTimezone (UTCDifference) {
  const sign = UTCDifference < 0 ? '-' : '+'
  return `UTC${sign + ('' + Math.abs(UTCDifference)).padStart(2, '0')}`
}
