/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';

import { useIntl } from 'react-intl';
import { useUpdateOffenderNameMutation } from '#/components/form-components/offender/KnowOffender/graphql/mutation/update-offender-name.generated';

interface Props {
  onClose: () => void;
  offenderId: string;
}
export interface FormData {
  name: string;
  infoSource: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useKnowOffender = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);

  const [updateOffender] = useUpdateOffenderNameMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender has been updated!',
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
          name: { set: data.name },
          infoSource: { set: data.infoSource },
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};

export default useKnowOffender;
