import { useState } from 'react';

import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { TagQuery } from 'graphql/tag/queries/tag.generated';
import { useTagQuery } from 'graphql/tag/queries/tag.generated';
import { useUpdateTagMutation } from 'graphql/tag/mutation/update_tag.generated';

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
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender warning has been updated.',
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
