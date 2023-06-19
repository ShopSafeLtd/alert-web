import type { Moment } from 'moment';
import moment from 'moment';

// calculate the difference in days between start and end date
const formatCalendar = (date: Moment | Date): string => {
  const timeIn24HourFormat = moment(date).format('HH:mm');
  // const dateFormat = date.format('DD/MM/YYYY HH:mm');
  return moment(date).calendar(null, {
    sameDay: `[Today - ${timeIn24HourFormat}]`,
    nextDay: `[Tomorrow - ${timeIn24HourFormat}]`,
    nextWeek: `dddd - [${timeIn24HourFormat}]`,
    lastDay: `[Yesterday - ${timeIn24HourFormat}]`,
    lastWeek: `[Last] dddd - [${timeIn24HourFormat}]`,
    sameElse: `[${moment(date).format('DD/MM/YYYY')}]`,
  });
};

export default formatCalendar;
