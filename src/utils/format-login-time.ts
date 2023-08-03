import moment from 'moment';
// calculate the difference in days between start and end date
const formatLoginTime = (timestamp: Date): string => {
  const date = moment(timestamp);
  const timeIn24HourFormat = date.format('HH:mm');

  return moment(date).calendar(null, {
    sameDay: `[Today ${timeIn24HourFormat}]`,
    nextDay: `[Tomorrow ${timeIn24HourFormat}]`,
    // nextWeek: `dddd [at] ${timeIn24HourFormat}`,
    nextWeek: `dddd ${timeIn24HourFormat}`,
    lastDay: `[Yesterday ${timeIn24HourFormat}]`,
    lastWeek: `[Last] dddd [${timeIn24HourFormat}]`,
    sameElse: `[${moment(date).format('DD/MM/YYYY')} ${timeIn24HourFormat}]`,
  });
};

export default formatLoginTime;
