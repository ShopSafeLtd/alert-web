import { useState } from 'react';
import type { TagQuery } from 'graphql/generated';
import { useUpdateTagMutation, useTagQuery } from 'graphql/generated';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

interface FormData {
  name: string;
  description: string;
}
interface Props {
  onClose: () => void;
  offenderId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: TagQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const useEditOffenderWarning = ({ onClose, offenderId }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const { data: TagData, loading } = useTagQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: offenderId,
      },
    },
  });

  const [updateTag] = useUpdateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender warning has been updated.',
          id: 'GI8rR7',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (offenderId)
      void updateTag({
        variables: {
          where: {
            id: offenderId,
          },
          data: {
            name: { set: data.name },
            description: { set: data.description },
          },
        },
      });
  };

  return {
    onSubmit,
    data: TagData,
    loading,
    saving,
  };
};

export default useEditOffenderWarning;
