import { useState } from 'react';
import { TagQuery, useUpdateTagMutation, useTagQuery } from 'graphql/generated';
import { notification } from 'antd';

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
        message: 'Successfully Updated!',
        description: 'The offender warning has been updated! ',
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
    if (offenderId)
      updateTag({
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
