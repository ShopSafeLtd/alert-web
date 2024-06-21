import { notification } from 'antd';
import { FormattedMessage } from 'react-intl';
import React from 'react';

const errorNotification = () =>
  notification.error({
    message: <FormattedMessage defaultMessage="Oops, something went wrong," />,
    description: (
      <FormattedMessage defaultMessage="This error has been reported to our team, if it continues to happen reach out to our support team." />
    ),
    placement: 'bottomRight',
  });

export default errorNotification;
