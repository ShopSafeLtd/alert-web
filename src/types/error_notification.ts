import { notification } from 'antd';
import { useIntl } from 'react-intl';

const errorNotification = () => {
  const intl = useIntl();
  return notification.error({
    message: intl.formatMessage({
      defaultMessage: 'Oops, something went wrong,',
      id: '9GUoY+',
    }),
    description: intl.formatMessage({
      defaultMessage:
        'This error has been reported to our team, if it continues to happen reach out to our support team.',
      id: '+F01hQ',
    }),
    placement: 'bottomRight',
  });
};

export default errorNotification;
