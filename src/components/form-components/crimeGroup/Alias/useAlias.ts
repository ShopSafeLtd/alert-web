import { useState } from 'react';
import type { CrimeGroupQuery } from 'graphql/generated';
import {
  useCrimeGroupQuery,
  useUpdateCrimeGroupMutation,
} from 'graphql/generated';
import { notification } from 'antd';

import { useParams } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

interface FormData {
  alias: string;
}

interface Props {
  onClose: () => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const useAddAlias = ({ onClose }: Props): Return => {
  const intl = useIntl();
  const params = useParams();
  const [saving, setSaving] = useState(false);

  const { data: crimeGroupData, loading } = useCrimeGroupQuery({
    variables: {
      where: {
        id: params.id,
      },
    },
  });

  const [updateCrimeGroup] = useUpdateCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The alias has been added to the crime group! ',
          id: 'bd2XVk',
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
    void updateCrimeGroup({
      variables: {
        where: {
          id: params.id || '',
        },
        data: {
          alias: data.alias,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
    data: crimeGroupData,
    loading,
  };
};
export default useAddAlias;
