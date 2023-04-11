import { useState } from 'react';
import type {
  CreateTagMutation,
  TagsQuery,
  TagsQueryVariables,
} from 'graphql/generated';
import {
  useCreateTagMutation,
  Model,
  QueryMode,
  TagsDocument,
} from 'graphql/generated';
import type { Scheme } from 'state';
import { useStoreState } from 'state';
import { notification } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';

interface FormData {
  name: string;
  description: string;
  schemes: string[];
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  userSchemes: Scheme[];
  schemeId: string;
}

const useAddOffenderWarning = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);

  const [createTag] = useCreateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Added!',
        description: 'The offender warning has been added! ',
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
          schemes: {
            connect: data.schemes.map((id) => ({
              id,
            })),
          },
          createdBy: { connect: { id: userId } },
          dataType: Model.Offender,
        },
      },
      update: (store, result) => {
        const existingData = store.readQuery<TagsQuery, TagsQueryVariables>({
          query: TagsDocument,
          variables: {
            where: {
              schemes: {
                some: {
                  id: {
                    in: [schemeId],
                  },
                },
              },
              dataType: {
                equals: Model.Offender,
              },
              OR: [
                {
                  name: {
                    contains: '',
                    mode: QueryMode.Insensitive,
                  },
                },
                {
                  description: {
                    contains: '',
                    mode: QueryMode.Insensitive,
                  },
                },
              ],
            },
          },
        });

        if (existingData && result.data)
          store.writeQuery<TagsQuery, TagsQueryVariables>({
            query: TagsDocument,
            variables: {
              where: {
                schemes: {
                  some: {
                    id: {
                      in: [schemeId],
                    },
                  },
                },
                dataType: {
                  equals: Model.Offender,
                },
                OR: [
                  {
                    name: {
                      contains: '',
                      mode: QueryMode.Insensitive,
                    },
                  },
                  {
                    description: {
                      contains: '',
                      mode: QueryMode.Insensitive,
                    },
                  },
                ],
              },
            },
            data: {
              tags: [...existingData.tags, result.data?.createTag],
            },
          });
      },
    });
  };

  return {
    onSubmit,
    saving,
    userSchemes,
    schemeId,
  };
};
export default useAddOffenderWarning;
