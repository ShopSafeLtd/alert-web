import moment from 'moment';
import { useIntl } from 'react-intl';

// calculate the difference in days between start and end date
const formatLoginTime = (timestamp: Date): string => {
  const date = moment(timestamp);
  const timeIn24HourFormat = date.format('HH:mm');
  const intl = useIntl();
  return moment(date).calendar(null, {
    sameDay: `[${intl.formatMessage({
      defaultMessage: 'Today',
    })} ${timeIn24HourFormat}]`,
    nextDay: `[${intl.formatMessage({
      defaultMessage: 'Tomorrow',
    })} ${timeIn24HourFormat}]`,
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
    sameElse: `[${moment(date).format('DD/MM/YYYY')} ${timeIn24HourFormat}]`,
  });
};

export default formatLoginTime;
