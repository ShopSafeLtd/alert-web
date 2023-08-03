import { useState } from 'react';
import type {
  CreateTagMutation,
  CrimeType,
  ListSchemeTagsQuery,
} from 'graphql/generated';
import {
  useCreateTagMutation,
  Model,
  TagType,
  useListSchemeTagsQuery,
} from 'graphql/generated';
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
  parentTagId?: string;
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
  tags: ListSchemeTagsQuery | undefined;
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

  const { data: tags } = useListSchemeTagsQuery({
    variables: {
      listWhere: {
        type: {
          equals: TagType.IncidentCrimeType,
        },
        dataType: {
          equals: Model.Incident,
        },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

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
          parentTag: data.parentTagId
            ? { connect: { id: data.parentTagId } }
            : undefined,
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
    tags,
  };
};
export default useAddCrimeType;
