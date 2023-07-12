import { useState } from 'react';
import type { CreateTagMutation, CrimeType } from 'graphql/generated';
import { useCreateTagMutation, Model, TagType } from 'graphql/generated';
import type { Scheme } from 'state';
import { useStoreState } from 'state';
import { notification } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

interface FormData {
  name: string;
  description: string;
  crimeType: CrimeType;
  schemes: string[];
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
  type?: TagType;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  userSchemes: Scheme[];
  schemeId: string;
}

const useAddCrimeType = ({
  onClose,
  update,
  type = TagType.IncidentCrimeType,
}: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);

  const [createTag] = useCreateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The crime type has been added! ',
          id: 'LWKS5X',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void createTag({
      variables: {
        data: {
          name: data.name,
          description: data.description || '',
          crimeType: data.crimeType,
          schemes: {
            connect: data.schemes.map((id) => ({
              id,
            })),
          },
          createdBy: { connect: { id: userId } },
          dataType: Model.Incident,
          type,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
    schemeId,
    userSchemes,
  };
};
export default useAddCrimeType;
