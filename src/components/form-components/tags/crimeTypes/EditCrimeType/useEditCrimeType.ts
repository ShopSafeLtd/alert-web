import { useState } from 'react';
import type { TagQuery, CrimeType } from 'graphql/generated';
import { useUpdateTagMutation, useTagQuery } from 'graphql/generated';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

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
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The crime type has been updated.',
          id: '/Gih2b',
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
