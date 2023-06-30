import { useState } from 'react';
import type { TagsQuery, TagsQueryVariables } from 'graphql/generated';
import {
  Model,
  QueryMode,
  TagsDocument,
  useCreateTagMutation,
  useTagsQuery,
  useUpdateTagMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';

import { Modal, notification } from 'antd';
import errorNotification from 'types/error_notification';
import type { TagData } from 'types/DataType';

const { confirm } = Modal;

interface Return {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addOffenderWarning: boolean;
  toggleAddOffenderWarning: () => void;
  offenderId: string;
  setOffenderId: (value: string) => void;
  editOffenderWarning: boolean;
  toggleEditOffenderWarning: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  onAddOffenderWarning: (value: TagData) => void;
}

const useOffenderWarningList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const schemeName = useStoreState((state) => state.scheme.name);
  const userId = useStoreState((state) => state.user.id);
  const [offenderId, setOffenderId] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addOffenderWarning, setAddOffenderWarning] = useState(false);
  const [editOffenderWarning, setEditOffenderWarning] = useState(false);

  const variables = {
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
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          description: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
  };
  const { data, loading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // createTag
  const [createTag] = useCreateTagMutation({
    onCompleted: () => {
      setSaving(false);
      setAddOffenderWarning(false);
      notification.success({
        message: 'Successfully Added!',
        description: 'The offender warning has been added! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;

      const existingData = store.readQuery<TagsQuery, TagsQueryVariables>({
        query: TagsDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<TagsQuery, TagsQueryVariables>({
        query: TagsDocument,
        data: {
          tags: [...existingData.tags, res.createTag],
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const onAddOffenderWarning = (value: TagData) => {
    createTag({
      variables: {
        data: {
          name: value.name,
          description: value.description || '',
          schemes: {
            connect: value.schemes.map((id) => ({
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
          variables,
        });

        if (existingData && result.data)
          store.writeQuery<TagsQuery, TagsQueryVariables>({
            query: TagsDocument,
            variables,
            data: {
              tags: [...existingData.tags, result.data?.createTag],
            },
          });
      },
    }).finally(() => setSaving(false));
  };

  // delete
  const [updateTag] = useUpdateTagMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Removed',
        description: `The crime type has been removed from ${schemeName}!`,
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
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;

      // get existing Offender list data from Apollo store
      const existingData = store.readQuery<TagsQuery>({
        query: TagsDocument,
        variables,
      });

      if (existingData === null) return;

      // write the new data to the Apollo store
      store.writeQuery<TagsQuery>({
        query: TagsDocument,
        data: {
          tags: existingData.tags.filter(
            (tag) => tag.id !== res?.updateTag?.id
          ),
          __typename: 'Query',
        },
        variables,
      });
    },
  });
  const openDelete = (currentId: string) => {
    setSaving(true);
    if (currentId)
      updateTag({
        variables: {
          where: {
            id: currentId,
          },
          data: {
            schemes: {
              disconnect: [
                {
                  id: schemeId,
                },
              ],
            },
          },
        },
      }).finally(() => setSaving(false));
  };

  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to delete the offender warning?',
      content: 'This action cannot be undone.',
      onOk() {
        openDelete(currentId);
      },
    });
  };
  const toggleAddOffenderWarning = () => {
    setAddOffenderWarning(!addOffenderWarning);
  };
  const toggleEditOffenderWarning = () => {
    setEditOffenderWarning(!editOffenderWarning);
  };

  return {
    data,
    loading,
    search,
    setSearch,
    addOffenderWarning,
    toggleAddOffenderWarning,
    offenderId,
    setOffenderId,
    editOffenderWarning,
    toggleEditOffenderWarning,
    saving,
    deleteConfirm,
    onAddOffenderWarning,
  };
};

export default useOffenderWarningList;
