import { notification } from 'antd';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import type {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '../enums/profile-update-type';

const successNotification = (
  title: ProfileUpdatedModel,
  subject: ProfileUpdatedModel,
  type: ProfileUpdatedType
) =>
  notification.success({
    message: (
      <FormattedMessage
        defaultMessage="Successfully {type}!"
        values={{ type }}
      />
    ),
    // description: title ? (
    //   <FormattedMessage
    //     defaultMessage="The {title} of the {subject} have been {type}!"
    //     id="q8MJJ6"
    //     values={{ title, subject, type }}
    //   />
    // ) : (
    //   <FormattedMessage
    //     defaultMessage="The {subject} have been {type}!"
    //     id="iSzzmY"
    //     values={{ subject, type }}
    //   />
    // ),
    description: (
      <FormattedMessage
        defaultMessage="The {title} of the {subject} have been {type}!"
        values={{ title, subject, type }}
      />
    ),
    placement: 'bottomRight',
  });
export default successNotification;
