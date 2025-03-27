import type { Dayjs } from 'dayjs';
import type { IntlShape } from 'react-intl';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

const FormatCalendar = (
  date: Date | Dayjs,
  intl: IntlShape,
  hideTime: boolean = false
): string => {
  const timeIn24HourFormat = dayjs(date).format('HH:mm');

  if (hideTime) {
    return dayjs(date).calendar(null, {
      lastDay: `[${intl.formatMessage({ defaultMessage: 'Yesterday' })}]`,
      lastWeek: `[${intl.formatMessage({ defaultMessage: 'Last' })}] ${intl.formatMessage({ defaultMessage: 'dddd' })}`,
      nextDay: `[${intl.formatMessage({ defaultMessage: 'Tomorrow' })}]`,
      nextWeek: intl.formatMessage({ defaultMessage: 'dddd' }),
      sameDay: `[${intl.formatMessage({ defaultMessage: 'Today' })}]`,
      sameElse: `[${dayjs(date).format('DD/MM/YYYY')}]`,
    });
  }
  return dayjs(date).calendar(null, {
    lastDay: `[${intl.formatMessage({ defaultMessage: 'Yesterday' })} ${timeIn24HourFormat}]`,
    lastWeek: `[${intl.formatMessage({ defaultMessage: 'Last' })}] ${intl.formatMessage({ defaultMessage: 'dddd' })} [${timeIn24HourFormat}]`,
    nextDay: `[${intl.formatMessage({ defaultMessage: 'Tomorrow' })} ${timeIn24HourFormat}]`,
    nextWeek: `${intl.formatMessage({ defaultMessage: 'dddd' })} ${timeIn24HourFormat}`,
    sameDay: `[${intl.formatMessage({ defaultMessage: 'Today' })} ${timeIn24HourFormat}]`,
    sameElse: `[${dayjs(date).format('DD/MM/YYYY')}]`,
  });
};

export default FormatCalendar;
