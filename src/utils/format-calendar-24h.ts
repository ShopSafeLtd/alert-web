import type { Moment } from 'moment';
import moment from 'moment';

// calculate the difference in days between start and end date
const formatCalendar = (date: Moment | Date, hideTime?: boolean): string => {
  const timeIn24HourFormat = moment(date).format('HH:mm');
  // const dateFormat = date.format('DD/MM/YYYY HH:mm');
  if (hideTime) {
    return moment(date).calendar(null, {
      sameDay: `[Today]`,
      nextDay: `[Tomorrow]`,
      nextWeek: `dddd`,
      lastDay: `[Yesterday]`,
      lastWeek: `[Last] dddd`,
      sameElse: `[${moment(date).format('DD/MM/YYYY')}]`,
    });
  }
  return moment(date).calendar(null, {
    sameDay: `[Today ${timeIn24HourFormat}]`,
    nextDay: `[Tomorrow ${timeIn24HourFormat}]`,
    // nextWeek: `dddd [at] ${timeIn24HourFormat}`,
    nextWeek: `dddd ${timeIn24HourFormat}`,
    lastDay: `[Yesterday ${timeIn24HourFormat}]`,
    lastWeek: `[Last] dddd [${timeIn24HourFormat}]`,
    sameElse: `[${moment(date).format('DD/MM/YYYY')}]`,
  });
};

export default formatCalendar;
