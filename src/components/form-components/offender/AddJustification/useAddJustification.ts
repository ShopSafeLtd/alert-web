/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import { useUpdateOffenderJustificationMutation } from '#/components/form-components/offender/AddJustification/graphql/mutation/__generated__/update-offender-name.generated';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  offenderId: string;
  onClose: () => void;
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
        description: intl.formatMessage({
          defaultMessage: 'The justification of offender has been updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
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
        data: {
          justification: { set: data.justification },
        },
        id: offenderId,
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};

export default useAddJustification;
