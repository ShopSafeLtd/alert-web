import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useIntl } from 'react-intl';

dayjs.extend(calendar);

// calculate the difference in days between start and end date
const FormatCalendar = (date: Date | Dayjs, hideTime?: boolean): string => {
  const timeIn24HourFormat = dayjs(date).format('HH:mm');
  const intl = useIntl();

  // const dateFormat = date.format('DD/MM/YYYY HH:mm');
  if (hideTime) {
    return dayjs(date).calendar(null, {
      lastDay: `[${intl.formatMessage({
        defaultMessage: 'Yesterday',
      })}]`,
      lastWeek: `[${intl.formatMessage({
        defaultMessage: 'Last',
      })}] ${intl.formatMessage({ defaultMessage: 'dddd' })}`,
      nextDay: `[${intl.formatMessage({
        defaultMessage: 'Tomorrow',
      })}]`,
      nextWeek: intl.formatMessage({ defaultMessage: 'dddd' }),
      sameDay: `[${intl.formatMessage({
        defaultMessage: 'Today',
      })}]`,
      sameElse: `[${dayjs(date).format('DD/MM/YYYY')}]`,
    });
  }
  return dayjs(date).calendar(null, {
    lastDay: `[${intl.formatMessage({
      defaultMessage: 'Yesterday',
    })} ${timeIn24HourFormat}]`,
    lastWeek: `[${intl.formatMessage({
      defaultMessage: 'Last',
    })}] ${intl.formatMessage({
      defaultMessage: 'dddd',
    })} [${timeIn24HourFormat}]`,
    nextDay: `[${intl.formatMessage({
      defaultMessage: 'Tomorrow',
    })} ${timeIn24HourFormat}]`,
    // nextWeek: `dddd [at] ${timeIn24HourFormat}`,
    nextWeek: `${intl.formatMessage({
      defaultMessage: 'dddd',
    })} ${timeIn24HourFormat}`,
    sameDay: `[${intl.formatMessage({
      defaultMessage: 'Today',
    })} ${timeIn24HourFormat}]`,
    sameElse: `[${dayjs(date).format('DD/MM/YYYY')}]`,
  });
};

export default FormatCalendar;
