import { notification } from 'antd';

const errorNotification = () =>
  notification.error({
    message: 'Error!',
    description: 'Whoops, there are some errors. Please try again. ',
    placement: 'bottomRight',
  });

export default errorNotification;
