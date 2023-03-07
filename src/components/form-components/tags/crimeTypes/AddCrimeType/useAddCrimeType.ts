import { useState } from 'react';
import {
  useCreateTagMutation,
  CreateTagMutation,
  Model,
  CrimeType,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import { MutationUpdaterFn } from '@apollo/client';

interface FormData {
  name: string;
  description: string;
  crimeType: CrimeType;
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddCrimeType = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);

  const [createTag] = useCreateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Added!',
        description: 'The crime type has been added! ',
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
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    createTag({
      variables: {
        data: {
          name: data.name,
          description: data.description || '',
          crimeType: data.crimeType,
          scheme: {
            connect: {
              id: schemeId,
            },
          },
          createdBy: { connect: { id: userId } },
          dataType: Model.Incident,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};
export default useAddCrimeType;
