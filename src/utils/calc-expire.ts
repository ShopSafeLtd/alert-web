// calculate if the end date is expired
const calcExpired = (endDate: Date) => {
  const end = new Date(endDate).valueOf();
  const now = Date.now();

  return end - now < 0;
};
export default calcExpired;
