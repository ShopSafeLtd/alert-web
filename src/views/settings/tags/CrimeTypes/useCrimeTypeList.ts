import type { MutationUpdaterFn } from '@apollo/client';
import type { RecycleTagMutation } from 'graphql/tag/mutation/__generated__/recycle-tag.generated';
import type { CreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Modal, notification } from 'antd';
import { useRecycleTagMutation } from 'graphql/tag/mutation/__generated__/recycle-tag.generated';
import { useUpdateTagMutation } from 'graphql/tag/mutation/__generated__/update_tag.generated';
import {
  TagsDocument,
  useTagsQuery,
} from 'graphql/tags/queries/__generated__/tags.generated';
import { Model, QueryMode, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface Return {
  addImpact: boolean;
  addIncident: boolean;
  addInvolved: boolean;
  data: TagsQuery | undefined;
  deleteConfirm: (value: string) => void;
  editIncident: boolean;
  impactData: TagsQuery | undefined;
  impactLoading: boolean;
  incidentId: string;
  involvedData: TagsQuery | undefined;
  involvedLoading: boolean;
  loading: boolean;
  saving: boolean;
  search: string;
  setIncidentId: (value: string) => void;
  setSearch: (value: string) => void;
  toggleAddImpact: () => void;
  toggleAddIncident: () => void;
  toggleAddInvolved: () => void;
  toggleEditIncident: () => void;
  updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation>;
  updateImpactList: MutationUpdaterFn<CreateTagMutation>;
  updateInvolvedList: MutationUpdaterFn<CreateTagMutation>;
  updateTagParent: (tagId: string, parentTagId: null | string) => void;
}

const useCrimeTypeList = (): Return => {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
      dataType: {
        equals: Model.Incident,
      },
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
      dataType: {
        equals: Model.Incident,
      },
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
    },
  });
  const [impactTagsVars, setImpactTagsVars] = useState({
    where: {
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
      dataType: {
        equals: Model.Incident,
      },
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
      data: {
        __typename: 'Query',
        tags: [...(<[]>existingData.tags), res.createTag],
      },
      query: TagsDocument,
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
      data: {
        __typename: 'Query',
        tags: [...(<[]>existingData.tags), res.createTag],
      },
      query: TagsDocument,
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
      data: {
        __typename: 'Query',
        tags: [...(<[]>existingData.tags), res.createTag],
      },
      query: TagsDocument,
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
        data: {
          __typename: 'Query',
          tags: existingData.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
        },
        query: TagsDocument,
        variables: crimeTypesVars,
      });
    if (existingInvolvedData)
      store.writeQuery<TagsQuery>({
        data: {
          __typename: 'Query',
          tags: existingInvolvedData.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
        },
        query: TagsDocument,
        variables: involvedTagsVars,
      });
    if (existingImpactData)
      store.writeQuery<TagsQuery>({
        data: {
          __typename: 'Query',
          tags: existingImpactData.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
        },
        query: TagsDocument,
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
        description: intl.formatMessage(
          {
            defaultMessage:
              'The incident type has been removed from {schemeName}',
          },
          { schemeName }
        ),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed',
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
      content: intl.formatMessage({
        defaultMessage:
          'This will remove this incident type from this scheme, bu not any other schemes you may have added it to.',
      }),
      onOk() {
        openDelete(currentId);
      },

      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
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

  const updateTagParent = (tagId: string, parentTagId: null | string) => {
    if (parentTagId) {
      if (checkTag(tagId, parentTagId)) {
        console.log(checkTag(tagId, parentTagId));

        void updateTag({
          variables: {
            data: {
              parentTag: {
                connect: {
                  id: parentTagId,
                },
              },
            },
            where: {
              id: tagId,
            },
          },
        });
      }
    } else {
      void updateTag({
        variables: {
          data: {
            parentTag: {
              disconnect: true,
            },
          },
          where: {
            id: tagId,
          },
        },
      });
    }
  };

  return {
    addImpact,
    addIncident,
    addInvolved,
    data,
    deleteConfirm,
    editIncident,
    impactData,
    impactLoading,
    incidentId,
    involvedData,
    involvedLoading,
    loading,
    saving,
    search,
    setIncidentId,
    setSearch,
    toggleAddImpact,
    toggleAddIncident,
    toggleAddInvolved,
    toggleEditIncident,
    updateCrimeTypeList,
    updateImpactList,
    updateInvolvedList,
    updateTagParent,
  };
};

export default useCrimeTypeList;
