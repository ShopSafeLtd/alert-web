import { notification } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '../enums/profile-update-type';

const successNotifications = (
  subject: ProfileUpdatedModel,
  type: ProfileUpdatedType,
  title?: ProfileUpdatedModel
) =>
  notification.success({
    description: title ? (
      <FormattedMessage
        defaultMessage="The {title} of the {subject} have been {type}!"
        values={{ subject, title, type }}
      />
    ) : (
      <FormattedMessage
        defaultMessage="The {subject} have been {type}!"
        values={{ subject, type }}
      />
    ),
    message: (
      <FormattedMessage
        defaultMessage="Successfully {type}!"
        values={{ type }}
      />
    ),

    placement: 'bottomRight',
  });
export default successNotifications;
