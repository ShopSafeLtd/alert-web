// calculate the difference in days between start and end date
const calcDuration = (startDate: Date, endDate: Date): string => {
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

export default calcDuration;
