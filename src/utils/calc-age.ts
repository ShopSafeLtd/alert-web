/**
 *
 * @param date string representation of a date, or Date object.
 * @returns number
 */
const calcAge = (date: string | Date) => {
  const birthDate = new Date(date);
  const now = Date.now();
  //@ts-expect-error doesnt like subtracting dates
  return Math.floor((now - birthDate) / 1000 / 60 / 60 / 24 / 365.25);
};

export default calcAge;
