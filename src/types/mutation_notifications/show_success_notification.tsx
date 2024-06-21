import { notification } from 'antd';
import { FormattedMessage } from 'react-intl';
import React from 'react';
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
    message: (
      <FormattedMessage
        defaultMessage="Successfully {type}!"
        values={{ type }}
      />
    ),
    description: title ? (
      <FormattedMessage
        defaultMessage="The {title} of the {subject} have been {type}!"
        values={{ title, subject, type }}
      />
    ) : (
      <FormattedMessage
        defaultMessage="The {subject} have been {type}!"
        values={{ subject, type }}
      />
    ),

    placement: 'bottomRight',
  });
export default successNotifications;
