import { useState } from 'react';
import type { CrimeType } from 'graphql/types';

import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { TagQuery } from 'graphql/tag/queries/tag.generated';
import { useTagQuery } from 'graphql/tag/queries/tag.generated';
import { useUpdateTagMutation } from 'graphql/tag/mutation/update_tag.generated';

interface FormData {
  name: string;
  description: string;
  crimeType: CrimeType;
}
interface Props {
  onClose: () => void;
  incidentId: string | undefined;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: TagQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const useEditCrimeType = ({ onClose, incidentId }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);

  const { data: TagData, loading } = useTagQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
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
          defaultMessage: 'The crime type has been updated.',
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
    if (incidentId)
      void updateTag({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            name: { set: data.name },
            description: { set: data.description },
            crimeType: data.crimeType ? { set: data.crimeType } : undefined,
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

export default useEditCrimeType;
