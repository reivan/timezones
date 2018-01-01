export function addHours (h1, h2) {
  const sum = h1 + h2;
  return (sum + 24) % 24;
};

export function formatTimezone(UTCDifference) {
  const sign = UTCDifference < 0 ? '-' : '+';
  return `UTC${sign + ('' + Math.abs(UTCDifference)).padStart(2, '0')}`;
};

export const newId = timezones => {
  if (timezones.length === 0) return 0;
  const lastItem = timezones[timezones.length - 1];
  return lastItem.id + 1;
};