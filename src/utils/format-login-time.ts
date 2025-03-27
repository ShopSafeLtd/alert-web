import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useIntl } from 'react-intl';

dayjs.extend(calendar);

// calculate the difference in days between start and end date
const formatLoginTime = (timestamp: Date): string => {
  const date = dayjs(timestamp);
  const timeIn24HourFormat = date.format('HH:mm');
  const intl = useIntl();
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
    nextWeek: `${intl.formatMessage({
      defaultMessage: 'dddd',
    })} ${timeIn24HourFormat}`,
    sameDay: `[${intl.formatMessage({
      defaultMessage: 'Today',
    })} ${timeIn24HourFormat}]`,
    sameElse: `[${dayjs(date).format('DD/MM/YYYY')} ${timeIn24HourFormat}]`,
  });
};

export default formatLoginTime;
