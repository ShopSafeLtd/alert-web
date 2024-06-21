import type { Moment } from 'moment';
import moment from 'moment';
import { useIntl } from 'react-intl';

// calculate the difference in days between start and end date
const FormatCalendar = (date: Moment | Date, hideTime?: boolean): string => {
  const timeIn24HourFormat = moment(date).format('HH:mm');
  const intl = useIntl();

  // const dateFormat = date.format('DD/MM/YYYY HH:mm');
  if (hideTime) {
    return moment(date).calendar(null, {
      sameDay: `[${intl.formatMessage({
        defaultMessage: 'Today',
      })}]`,
      nextDay: `[${intl.formatMessage({
        defaultMessage: 'Tomorrow',
      })}]`,
      nextWeek: intl.formatMessage({ defaultMessage: 'dddd' }),
      lastDay: `[${intl.formatMessage({
        defaultMessage: 'Yesterday',
      })}]`,
      lastWeek: `[${intl.formatMessage({
        defaultMessage: 'Last',
      })}] ${intl.formatMessage({ defaultMessage: 'dddd' })}`,
      sameElse: `[${moment(date).format('DD/MM/YYYY')}]`,
    });
  }
  return moment(date).calendar(null, {
    sameDay: `[${intl.formatMessage({
      defaultMessage: 'Today',
    })} ${timeIn24HourFormat}]`,
    nextDay: `[${intl.formatMessage({
      defaultMessage: 'Tomorrow',
    })} ${timeIn24HourFormat}]`,
    // nextWeek: `dddd [at] ${timeIn24HourFormat}`,
    nextWeek: `${intl.formatMessage({
      defaultMessage: 'dddd',
    })} ${timeIn24HourFormat}`,
    lastDay: `[${intl.formatMessage({
      defaultMessage: 'Yesterday',
    })} ${timeIn24HourFormat}]`,
    lastWeek: `[${intl.formatMessage({
      defaultMessage: 'Last',
    })}] ${intl.formatMessage({
      defaultMessage: 'dddd',
    })} [${timeIn24HourFormat}]`,
    sameElse: `[${moment(date).format('DD/MM/YYYY')}]`,
  });
};

export default FormatCalendar;
