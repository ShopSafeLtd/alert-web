import type { Moment } from 'moment';
import moment from 'moment';
import { useIntl } from 'react-intl';

// calculate the difference in days between start and end date
const formatCalendar = (date: Moment | Date, hideTime?: boolean): string => {
  const timeIn24HourFormat = moment(date).format('HH:mm');
  const intl = useIntl();

  // const dateFormat = date.format('DD/MM/YYYY HH:mm');
  if (hideTime) {
    return moment(date).calendar(null, {
      sameDay: `[${intl.formatMessage({
        defaultMessage: 'Today',
        id: 'zWgbGg',
      })}]`,
      nextDay: `[${intl.formatMessage({
        defaultMessage: 'Tomorrow',
        id: 'MtrTNy',
      })}]`,
      nextWeek: intl.formatMessage({ defaultMessage: 'dddd', id: '0yYUWg' }),
      lastDay: `[${intl.formatMessage({
        defaultMessage: 'Yesterday',
        id: '6dIxDP',
      })}]`,
      lastWeek: `[${intl.formatMessage({
        defaultMessage: 'Last',
        id: '8nvhZ9',
      })}] ${intl.formatMessage({ defaultMessage: 'dddd', id: '0yYUWg' })}`,
      sameElse: `[${moment(date).format('DD/MM/YYYY')}]`,
    });
  }
  return moment(date).calendar(null, {
    sameDay: `[${intl.formatMessage({
      defaultMessage: 'Today',
      id: 'zWgbGg',
    })} ${timeIn24HourFormat}]`,
    nextDay: `[${intl.formatMessage({
      defaultMessage: 'Tomorrow',
      id: 'MtrTNy',
    })} ${timeIn24HourFormat}]`,
    // nextWeek: `dddd [at] ${timeIn24HourFormat}`,
    nextWeek: `${intl.formatMessage({
      defaultMessage: 'dddd',
      id: '0yYUWg',
    })} ${timeIn24HourFormat}`,
    lastDay: `[${intl.formatMessage({
      defaultMessage: 'Yesterday',
      id: '6dIxDP',
    })} ${timeIn24HourFormat}]`,
    lastWeek: `[${intl.formatMessage({
      defaultMessage: 'Last',
      id: '8nvhZ9',
    })}] ${intl.formatMessage({
      defaultMessage: 'dddd',
      id: '0yYUWg',
    })} [${timeIn24HourFormat}]`,
    sameElse: `[${moment(date).format('DD/MM/YYYY')}]`,
  });
};

export default formatCalendar;
