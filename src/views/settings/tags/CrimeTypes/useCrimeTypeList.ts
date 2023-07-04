import { useEffect, useState } from 'react';
import type {
  CreateTagMutation,
  RecycleTagMutation,
  TagsQuery,
} from 'graphql/generated';
import {
  useRecycleTagMutation,
  Model,
  QueryMode,
  TagsDocument,
  TagType,
  useTagsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { Modal, notification } from 'antd';
import errorNotification from 'types/error_notification';

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
  const schemeName = useStoreState((state) => state.scheme.name);
  const [incidentId, setIncidentId] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addIncident, setAddIncident] = useState(false);
  const [addInvolved, setAddInvolved] = useState(false);
  const [addImpact, setAddImpact] = useState(false);
  const [editIncident, setEditIncident] = useState(false);
  const [crimeTypesVars, setCrimeTypesVars] = useState({
    where: {
      schemes: {
        some: {
          id: {
            in: [schemeId],
          },
        },
      },
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
  });
  const [involvedTagsVars, setInvolvedTagsVars] = useState({
    where: {
      schemes: {
        some: {
          id: {
            in: [schemeId],
          },
        },
      },
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
  });
  const [impactTagsVars, setImpactTagsVars] = useState({
    where: {
      schemes: {
        some: {
          id: {
            in: [schemeId],
          },
        },
      },
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
  });

  useEffect(() => {
    setCrimeTypesVars({
      where: {
        ...crimeTypesVars.where,
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
    });

    setInvolvedTagsVars({
      where: {
        ...involvedTagsVars.where,
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
    });

    setImpactTagsVars({
      where: {
        ...impactTagsVars.where,
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
    });
  }, [search]);

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
    variables: crimeTypesVars,
  });

  const { data: involvedData, loading: involvedLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: involvedTagsVars,
  });

  const { data: impactData, loading: impactLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: impactTagsVars,
  });

  const updateImpactList: MutationUpdaterFn<CreateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: impactTagsVars,
    });

    if (existingData === null) return;

    store.writeQuery<TagsQuery>({
      query: TagsDocument,
      data: {
        tags: [...(<[]>existingData.tags), res.createTag],
        __typename: 'Query',
      },
      variables: impactTagsVars,
    });
  };

  const updateInvolvedList: MutationUpdaterFn<CreateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: involvedTagsVars,
    });

    if (existingData === null) return;

    store.writeQuery<TagsQuery>({
      query: TagsDocument,
      data: {
        tags: [...(<[]>existingData.tags), res.createTag],
        __typename: 'Query',
      },
      variables: involvedTagsVars,
    });
  };

  const updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: crimeTypesVars,
    });

    if (existingData === null) return;

    store.writeQuery<TagsQuery>({
      query: TagsDocument,
      data: {
        tags: [...(<[]>existingData.tags), res.createTag],
        __typename: 'Query',
      },
      variables: crimeTypesVars,
    });
  };

  // update list after deleting an item
  const update: MutationUpdaterFn<RecycleTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: crimeTypesVars,
    });
    const existingInvolvedData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: involvedTagsVars,
    });
    const existingImpactData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: impactTagsVars,
    });

    if (existingData)
      store.writeQuery<TagsQuery>({
        query: TagsDocument,
        data: {
          tags: existingData.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
          __typename: 'Query',
        },
        variables: crimeTypesVars,
      });
    if (existingInvolvedData)
      store.writeQuery<TagsQuery>({
        query: TagsDocument,
        data: {
          tags: existingInvolvedData.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
          __typename: 'Query',
        },
        variables: involvedTagsVars,
      });
    if (existingImpactData)
      store.writeQuery<TagsQuery>({
        query: TagsDocument,
        data: {
          tags: existingImpactData.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
          __typename: 'Query',
        },
        variables: impactTagsVars,
      });
  };

  // recycle Tag
  // ???
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [recycleTag] = useRecycleTagMutation({
    onCompleted: () => {
      setSaving(false);
      // new thing to translate
      notification.success({
        message: 'Successfully Removed',
        description: `The crime type has been removed from ${schemeName}!`,
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });
  const openDelete = (currentId: string) => {
    setSaving(true);
    if (currentId)
      void recycleTag({
        variables: {
          where: {
            id: currentId,
          },
        },
      }).finally(() => setSaving(false));
  };

  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Are you sure?',
      content:
        'This will remove this crime type from this scheme, bu not any other schemes you may have added it to.',
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
