import { useState } from 'react';
import {
  CrimeGroupQuery,
  useCrimeGroupQuery,
  useUpdateCrimeGroupMutation,
} from 'graphql/generated';
import { notification } from 'antd';

import { useParams } from 'react-router';

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
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
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
