import { useState } from 'react';
import {
  TagQuery,
  useUpdateTagMutation,
  useTagQuery,
  CrimeType,
} from 'graphql/generated';
import { notification } from 'antd';

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
        message: 'Successfully Updated!',
        description: 'The crime type has been updated! ',
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
    if (incidentId)
      updateTag({
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
