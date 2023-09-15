import { notification } from 'antd';
import { FormattedMessage } from 'react-intl';
import React from 'react';

const errorNotification = () =>
  notification.error({
    message: (
      <FormattedMessage
        defaultMessage="Oops, something went wrong,"
        id="9GUoY+"
      />
    ),
    description: (
      <FormattedMessage
        defaultMessage="This error has been reported to our team, if it continues to happen reach out to our support team."
        id="+F01hQ"
      />
    ),
    placement: 'bottomRight',
  });

export default errorNotification;
