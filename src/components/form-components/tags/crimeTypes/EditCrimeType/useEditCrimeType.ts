import type { TagQuery } from 'graphql/tag/queries/__generated__/tag.generated';
import type { CrimeType } from 'graphql/types';

import { notification } from 'antd';
import { useUpdateTagMutation } from 'graphql/tag/mutation/__generated__/update_tag.generated';
import { useTagQuery } from 'graphql/tag/queries/__generated__/tag.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface FormData {
  crimeType: CrimeType;
  description: string;
  name: string;
}
interface Props {
  incidentId: string | undefined;
  onClose: () => void;
}
interface Return {
  data: TagQuery | undefined;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useEditCrimeType = ({ incidentId, onClose }: Props): Return => {
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
        description: intl.formatMessage({
          defaultMessage: 'The crime type has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
          data: {
            crimeType: data.crimeType ? { set: data.crimeType } : undefined,
            description: { set: data.description },
            name: { set: data.name },
          },
          where: {
            id: incidentId,
          },
        },
      });
  };

  return {
    data: TagData,
    loading,
    onSubmit,
    saving,
  };
};

export default useEditCrimeType;
