import type { ListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/list-tags.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import type { CrimeType } from 'graphql/types';
import type { Scheme } from 'state';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/list-tags.generated';
import { notification } from 'antd';
import { useCreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import { Model, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface FormData {
  crimeType: CrimeType;
  description: string;
  name: string;
  parentTagId?: string;
  roles: string[];
  schemes: string[];
}

interface Props {
  onClose: () => void;
  type?: TagType;
  update: MutationUpdaterFn<CreateTagMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  schemeId: string;
  tags: ListSchemeTagsQuery | undefined;
  userSchemes: Scheme[];
}

const useAddCrimeType = ({
  onClose,
  type = TagType.IncidentCrimeType,
  update,
}: Props): Return => {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const userId = useAtomValue(userIdAtom);
  const [saving, setSaving] = useState(false);

  const { data: tags } = useListSchemeTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      listWhere: {
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
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
    },
  });

  const [createTag] = useCreateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The incident type has been added! ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
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
          createdBy: { connect: { id: userId } },
          crimeType: data.crimeType,
          dataType: Model.Incident,
          description: data.description || '',
          name: data.name,
          parentTag: data.parentTagId
            ? { connect: { id: data.parentTagId } }
            : undefined,
          roles:
            data.roles.length > 0
              ? {
                  connect: data.roles.map((id) => ({
                    id,
                  })),
                }
              : undefined,
          schemes: {
            // connect: data.schemes.map((id) => ({
            //   id,
            // })),
            connect: [
              {
                id: schemeId,
              },
            ],
          },
          type,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
    schemeId,
    tags,
    userSchemes,
  };
};
export default useAddCrimeType;
