import { useState } from 'react';
import type { CrimeGroupQuery } from 'graphql/generated';
import {
  useCrimeGroupQuery,
  useUpdateCrimeGroupMutation,
} from 'graphql/generated';
import { notification } from 'antd';

import { useParams } from 'react-router';
import errorNotification from 'types/error_notification';

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
        message: 'Successfully Updated!',
        description: 'The alias has been added to the crime group! ',
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
    updateCrimeGroup({
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
