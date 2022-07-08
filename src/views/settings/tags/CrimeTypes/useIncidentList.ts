import { useState } from 'react';
import {
  QueryMode,
  useTagsQuery,
  TagsQuery,
  TagsDocument,
  CreateTagMutation,
  useDeleteTagMutation,
  Model,
  DeleteTagMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';
import { notification, Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addIncident: boolean;
  toggleAddIncident: () => void;
  updateIncidentList: MutationUpdaterFn<CreateTagMutation>;
  incidentId: string;
  setIncidentId: (value: string) => void;
  editIncident: boolean;
  toggleEditIncident: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useIncidentList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [incidentId, setIncidentId] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addIncident, setAddIncident] = useState(false);
  const [editIncident, setEditIncident] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The Incident warning has been deleted!',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
  const toggleAddIncident = () => {
    setAddIncident(!addIncident);
  };
  const toggleEditIncident = () => {
    setEditIncident(!editIncident);
  };

  const { data, loading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        dataType: {
          equals: Model.Incident,
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

  // update list after adding a new item
  const updateIncidentList: MutationUpdaterFn<CreateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing Incident list data from Apollo store
    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Incident,
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
        tags: [...existingData.tags, res.createTag],
        __typename: 'Query',
      },
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Incident,
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
  const update: MutationUpdaterFn<DeleteTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing Incident list data from Apollo store
    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Incident,
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
        tags: existingData.tags.filter((tag) => tag.id !== res?.deleteTag?.id),
        __typename: 'Query',
      },
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Incident,
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
  const [deleteTag] = useDeleteTagMutation({
    onCompleted: () => {
      setSaving(false);
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
      setSaving(false);
    },
    update,
  });
  const openDelete = (currentId: string) => {
    setSaving(true);
    if (currentId)
      deleteTag({
        variables: {
          id: currentId,
        },
      });
  };

  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to delete the Crime Types?',
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
    addIncident,
    toggleAddIncident,
    updateIncidentList,
    incidentId,
    setIncidentId,
    editIncident,
    toggleEditIncident,
    saving,
    deleteConfirm,
  };
};

export default useIncidentList;
