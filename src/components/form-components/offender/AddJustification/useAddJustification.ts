/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';

import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';

import { useIntl } from 'react-intl';
import { useUpdateOffenderJustificationMutation } from '#/components/form-components/offender/AddJustification/graphql/mutation/update-offender-name.generated';

interface Props {
  onClose: () => void;
  offenderId: string;
}
export interface FormData {
  // name: string;
  justification: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddJustification = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);

  const [updateOffender] = useUpdateOffenderJustificationMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The justification of offender has been updated!',
        }),
        placement: 'bottomRight',
      });
      onClose();
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void updateOffender({
      variables: {
        id: offenderId,
        data: {
          justification: { set: data.justification },
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};

export default useAddJustification;
