import { useEffect, useState } from 'react';
import type {
  CreateTagMutation,
  RecycleTagMutation,
  TagsQuery,
} from 'graphql/generated';
import {
  Model,
  QueryMode,
  TagsDocument,
  TagType,
  useRecycleTagMutation,
  useTagsQuery,
  useUpdateTagMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

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
  updateTagParent: (tagId: string, parentTagId: string | null) => void;
}

const useCrimeTypeList = (): Return => {
  const intl = useIntl();
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
      // OR: [
      //   {
      //     name: {
      //       contains: search,
      //       mode: QueryMode.Insensitive,
      //     },
      //   },
      //   {
      //     description: {
      //       contains: search,
      //       mode: QueryMode.Insensitive,
      //     },
      //   },
      // ],
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
        // OR: [
        //   {
        //     name: {
        //       contains: search,
        //       mode: QueryMode.Insensitive,
        //     },
        //   },
        //   {
        //     description: {
        //       contains: search,
        //       mode: QueryMode.Insensitive,
        //     },
        //   },
        // ],
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
      notification.success({
        message: intl.formatMessage({
          id: 'NzVm0o',
          defaultMessage: 'Successfully Removed',
        }),
        description: intl.formatMessage(
          {
            defaultMessage: 'The crime type has been removed from {schemeName}',
            id: 'Og1LWe',
          },
          { schemeName }
        ),
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
      title: intl.formatMessage({
        id: '2oCaym',
        defaultMessage: 'Are you sure?',
      }),
      content: intl.formatMessage({
        id: 'q21W2X',
        defaultMessage:
          'This will remove this crime type from this scheme, bu not any other schemes you may have added it to.',
      }),

      onOk() {
        openDelete(currentId);
      },
    });
  };

  const [updateTag] = useUpdateTagMutation();

  const checkTag = (tagId: string, parentTagId: string) => {
    // get all children of the tag
    const children = data?.tags?.filter((tag) => tag?.parentTag?.id === tagId);
    // if there are no children, return true
    if (!children) return true;
    // if there are children, check each child
    // eslint-disable-next-line no-restricted-syntax
    for (const child of children) {
      // if the parentTagId is the same as the tagId, return false
      if (child?.id === parentTagId) return false;
      // if the parentTagId is not the same as the tagId, check the children of the child
      if (!checkTag(child?.id, parentTagId)) return false;
    }
    console.log('valid');
    return true;
  };

  const updateTagParent = (tagId: string, parentTagId: string | null) => {
    if (parentTagId) {
      if (checkTag(tagId, parentTagId)) {
        console.log(checkTag(tagId, parentTagId));

        void updateTag({
          variables: {
            where: {
              id: tagId,
            },
            data: {
              parentTag: {
                connect: {
                  id: parentTagId,
                },
              },
            },
          },
        });
      }
    } else {
      void updateTag({
        variables: {
          where: {
            id: tagId,
          },
          data: {
            parentTag: {
              disconnect: true,
            },
          },
        },
      });
    }
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
    updateTagParent,
  };
};

export default useCrimeTypeList;
