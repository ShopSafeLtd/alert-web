// calculate the difference in days between start and end date
export const calcDuration = (startDate: Date, endDate: Date): string => {
  const start = new Date(startDate).valueOf();
  const end = new Date(endDate).valueOf();

  const difference = Math.abs(end - start);
  const days = Math.ceil(difference / 1000 / 60 / 60 / 24);

  if (days <= 365.25) return `${days} days`;
  return `${Math.floor(days / 365.25)} years${
    days % 365.25 > 0
      ? ` ${Math.floor(days % 365.25)} day${days % 365.25 > 1 ? 's' : ''}`
      : ''
  } `;
};

// calculate if the end date is expired
export const calcExpired = (endDate: Date): boolean => {
  const end = new Date(endDate).valueOf();
  const now = Date.now();

  return end - now < 0;
};
