import { notification } from 'antd';

const errorNotification = () =>
  notification.error({
    description:
      'This error has been reported to our team, if it continues to happen reach out to our support team.',
    message: 'Oops, something went wrong',
    placement: 'bottomRight',
  });

export default errorNotification;
