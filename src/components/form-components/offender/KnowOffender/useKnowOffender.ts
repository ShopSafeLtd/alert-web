/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import { useUpdateOffenderNameMutation } from '#/components/form-components/offender/KnowOffender/graphql/mutation/__generated__/update-offender-name.generated';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  offenderId: string;
  onClose: () => void;
}
export interface FormData {
  infoSource: string;
  name: string;
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
        description: intl.formatMessage({
          defaultMessage: 'The offender has been updated!',
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
          infoSource: { set: data.infoSource },
          name: { set: data.name },
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

export default useKnowOffender;
