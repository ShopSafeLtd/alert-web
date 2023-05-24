import { notification } from 'antd';

const errorNotification = () =>
  notification.error({
    message: 'Oops, something went wrong',
    description:
      'This error has been reported to our team, if it continues to happen reach out to our support team.',
    placement: 'bottomRight',
  });

export default errorNotification;
