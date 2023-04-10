import { useState } from 'react';
import type {
  TagsQuery,
  CreateTagMutation,
  DeleteTagMutation,
} from 'graphql/generated';
import {
  QueryMode,
  useTagsQuery,
  TagsDocument,
  useDeleteTagMutation,
  Model,
  TagType,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification, Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: TagsQuery | undefined;
  loading: boolean;
  involvedData: TagsQuery | undefined;
  involvedLoading: boolean;
  impactData: TagsQuery | undefined;
  impactLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addIncident: boolean;
  addInvolved: boolean;
  addImpact: boolean;
  toggleAddIncident: () => void;
  toggleAddInvolved: () => void;
  toggleAddImpact: () => void;
  updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation>;
  updateInvolvedList: MutationUpdaterFn<CreateTagMutation>;
  updateImpactList: MutationUpdaterFn<CreateTagMutation>;
  incidentId: string;
  setIncidentId: (value: string) => void;
  editIncident: boolean;
  toggleEditIncident: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}

const useCrimeTypeList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [incidentId, setIncidentId] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addIncident, setAddIncident] = useState(false);
  const [addInvolved, setAddInvolved] = useState(false);
  const [addImpact, setAddImpact] = useState(false);
  const [editIncident, setEditIncident] = useState(false);

  const toggleAddIncident = () => {
    setAddIncident(!addIncident);
  };
  const toggleAddInvolved = () => {
    setAddInvolved(!addInvolved);
  };
  const toggleAddImpact = () => {
    setAddImpact(!addImpact);
  };
  const toggleEditIncident = () => {
    setEditIncident(!editIncident);
  };

  const { data, loading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        type: {
          equals: TagType.IncidentCrimeType,
        },
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

  const { data: involvedData, loading: involvedLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        type: {
          equals: TagType.IncidentInvolved,
        },
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

  const { data: impactData, loading: impactLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        type: {
          equals: TagType.IncidentImpact,
        },
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
  const updateImpactList: MutationUpdaterFn<CreateTagMutation> = (
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
          type: {
            equals: TagType.IncidentImpact,
          },
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
          type: {
            equals: TagType.IncidentImpact,
          },
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

  const updateInvolvedList: MutationUpdaterFn<CreateTagMutation> = (
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
          type: {
            equals: TagType.IncidentInvolved,
          },
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
          type: {
            equals: TagType.IncidentInvolved,
          },
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

  const updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation> = (
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
          type: {
            equals: TagType.IncidentCrimeType,
          },
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
          type: {
            equals: TagType.IncidentCrimeType,
          },
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
          type: {
            equals: TagType.IncidentCrimeType,
          },
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
    const existingInvolvedData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          type: {
            equals: TagType.IncidentInvolved,
          },
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
    const existingImpactData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          type: {
            equals: TagType.IncidentImpact,
          },
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

    // write the new data to the Apollo store
    if (existingData)
      store.writeQuery<TagsQuery>({
        query: TagsDocument,
        data: {
          tags: existingData.tags.filter(
            (tag) => tag.id !== res?.deleteTag?.id
          ),
          __typename: 'Query',
        },
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
            type: {
              equals: TagType.IncidentCrimeType,
            },
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
    if (existingInvolvedData)
      store.writeQuery<TagsQuery>({
        query: TagsDocument,
        data: {
          tags: existingInvolvedData.tags.filter(
            (tag) => tag.id !== res?.deleteTag?.id
          ),
          __typename: 'Query',
        },
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
            type: {
              equals: TagType.IncidentInvolved,
            },
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
    if (existingImpactData)
      store.writeQuery<TagsQuery>({
        query: TagsDocument,
        data: {
          tags: existingImpactData.tags.filter(
            (tag) => tag.id !== res?.deleteTag?.id
          ),
          __typename: 'Query',
        },
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
            type: {
              equals: TagType.IncidentImpact,
            },
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
      notification.success({
        message: 'Successfully Deleted!',
        description: 'The crime type has been deleted!',
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
      deleteTag({
        variables: {
          id: currentId,
        },
      });
  };

  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to delete the crime type?',
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
    addImpact,
    addInvolved,
    toggleAddIncident,
    toggleAddImpact,
    toggleAddInvolved,
    updateCrimeTypeList,
    incidentId,
    setIncidentId,
    editIncident,
    toggleEditIncident,
    saving,
    deleteConfirm,
    involvedData,
    involvedLoading,
    impactData,
    impactLoading,
    updateInvolvedList,
    updateImpactList,
  };
};

export default useCrimeTypeList;
