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
      id: 'zWgbGg',
    })} ${timeIn24HourFormat}]`,
    nextDay: `[${intl.formatMessage({
      defaultMessage: 'Tomorrow',
      id: 'MtrTNy',
    })} ${timeIn24HourFormat}]`,
    // nextWeek: `dddd [at] ${timeIn24HourFormat}`,
    nextWeek: `dddd ${timeIn24HourFormat}`,
    lastDay: `[${intl.formatMessage({
      defaultMessage: 'Yesterday',
      id: '6dIxDP',
    })} ${timeIn24HourFormat}]`,
    lastWeek: `[Last] dddd [${timeIn24HourFormat}]`,
    sameElse: `[${moment(date).format('DD/MM/YYYY')} ${timeIn24HourFormat}]`,
  });
};

export default formatLoginTime;
