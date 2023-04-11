import { useState } from 'react';
import type {
  TagsQuery,
  CreateTagMutation,
  UpdateTagMutation,
} from 'graphql/generated';
import {
  QueryMode,
  useTagsQuery,
  TagsDocument,
  useUpdateTagMutation,
  Model,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification, Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addOffender: boolean;
  toggleAddOffender: () => void;
  updateOffenderWarningList: MutationUpdaterFn<CreateTagMutation>;
  offenderId: string;
  setOffenderId: (value: string) => void;
  editOffender: boolean;
  toggleEditOffender: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}

const useOffenderWarningList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const schemeName = useStoreState((state) => state.scheme.name);
  const [offenderId, setOffenderId] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [editOffender, setEditOffender] = useState(false);

  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleEditOffender = () => {
    setEditOffender(!editOffender);
  };

  const { data, loading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
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
    },
  });

  // update tag list after adding a new item
  const updateOffenderWarningList: MutationUpdaterFn<CreateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<TagsQuery>({
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
      },
    });

    if (existingData === null) return;

    store.writeQuery<TagsQuery>({
      query: TagsDocument,
      data: {
        tags: [...existingData.tags, res.createTag],
        __typename: 'Query',
      },
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
      },
    });
  };
  // update list after deleting an item
  const update: MutationUpdaterFn<UpdateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing Offender list data from Apollo store
    const existingData = store.readQuery<TagsQuery>({
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
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<TagsQuery>({
      query: TagsDocument,
      data: {
        tags: existingData.tags.filter((tag) => tag.id !== res?.updateTag?.id),
        __typename: 'Query',
      },
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
      },
    });
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
    update,
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
      });
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

  return {
    data,
    loading,
    search,
    setSearch,
    addOffender,
    toggleAddOffender,
    updateOffenderWarningList,
    offenderId,
    setOffenderId,
    editOffender,
    toggleEditOffender,
    saving,
    deleteConfirm,
  };
};

export default useOffenderWarningList;
