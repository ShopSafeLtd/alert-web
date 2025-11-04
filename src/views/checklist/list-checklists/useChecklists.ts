import type { CreateActiveChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/create-active-checklist.generated';
import type {
  ActiveChecklistsQuery,
  ActiveChecklistsQueryVariables,
} from '#/views/checklist/graphql/queries/__generated__/list-active-checklists.generated';
import type { ChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-checklists.generated';
import type { FetchResult } from '@apollo/client';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { useCreateActiveChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/create-active-checklist.generated';
import { useRecycleChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/recycle-checklist.generated';
import {
  ActiveChecklistsDocument,
  useActiveChecklistsQuery,
} from '#/views/checklist/graphql/queries/__generated__/list-active-checklists.generated';
import { useChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-checklists.generated';
import { notification } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import type {
  ActiveChecklistSortOptions,
  ChecklistSortOptions,
  ChecklistSortOrder,
  FilterModelValues,
  SetChecklistFilterModel,
} from '../../../state/filter-model';

import { useStoreActions, useStoreState } from '../../../state';
import { useRecycleActiveChecklistMutation } from '../graphql/mutations/__generated__/recycle-active-checklist.generated';

interface Return {
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  activeChecklistsData: ActiveChecklistsQuery | undefined;
  activeChecklistsLoading: boolean;
  activeTab: string;
  checklistFilter: FilterModelValues;
  checklistSort: {
    field: ChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  createActive: ({
    businessId,
    checklistId,
    title,
  }: {
    businessId: null | string;
    checklistId: string;
    title: string;
  }) => Promise<FetchResult<CreateActiveChecklistMutation>>;
  createChecklistOpen: boolean;
  data: ChecklistsQuery | undefined;
  deleteChecklist: (id: string) => void;
  deleteTemplate: (id: string) => void;
  loading: boolean;
  saving: boolean;
  selectedChecklist: { id: string; title: string } | null;
  setActiveChecklistSort: (args: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  }) => void;
  setChecklistFilters: (filters: SetChecklistFilterModel) => void;
  setChecklistSort: (args: {
    field: ChecklistSortOptions;
    order: ChecklistSortOrder;
  }) => void;
  toggleCreateChecklistDrawer: (
    args: { checklistId: string; title: string } | null
  ) => void;
}

const useChecklists = (): Return => {
  const intl = useIntl();

  const { activeChecklistSort, checklistFilter, checklistSort } = useStoreState(
    (state) => state.filter
  );
  const { setActiveChecklistSort, setChecklistFilters, setChecklistSort } =
    useStoreActions((state) => state.filter);
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const [saving, setSaving] = useState(false);

  const { data, loading } = useChecklistsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        [checklistSort.field]: checklistSort.order,
      },
      where: {
        OR: [
          {
            roles: {
              none: {},
            },
          },
          {
            roles: {
              some: {
                users: {
                  some: { userId: { equals: userId } },
                },
              },
            },
          },
        ],
        business: checklistFilter.businesses?.length
          ? { some: { id: { in: checklistFilter.businesses } } }
          : undefined,
        deleted: { equals: false },
        schemes: {
          some: { id: { equals: schemeId } },
        },
        users: checklistFilter.ownUser
          ? { some: { id: { equals: userId } } }
          : undefined,
      },
    },
  });
  const activeChecklistVariables: ActiveChecklistsQueryVariables = {
    order: {
      [activeChecklistSort.field]: activeChecklistSort.order,
    },
    where: {
      OR: [
        {
          checklist: {
            business: checklistFilter.businesses?.length
              ? { some: { id: { in: checklistFilter.businesses } } }
              : undefined,
            schemes: {
              some: { id: { equals: schemeId } },
            },
          },
        },
        {
          business: checklistFilter.businesses?.length
            ? { id: { in: checklistFilter.businesses } }
            : undefined,
          checklist: {
            schemes: {
              some: { id: { equals: schemeId } },
            },
          },

          completedBy: checklistFilter.ownUser
            ? { id: { equals: userId } }
            : undefined,
        },
      ],
      deleted: { equals: false },
      status: {
        in: checklistFilter.activeStatus,
      },
    },
  };
  const {
    data: activeChecklistsData,
    loading: activeChecklistsLoading,
    refetch,
  } = useActiveChecklistsQuery({
    fetchPolicy: 'cache-and-network',
    variables: activeChecklistVariables,
  });

  const [createActiveChecklist] = useCreateActiveChecklistMutation();

  const [selectedChecklist, setSelectedChecklist] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const toggleCreateChecklistDrawer = (
    args: { checklistId: string; title: string } | null
  ) => {
    if (args) {
      setSelectedChecklist({
        id: args.checklistId,
        title: args.title,
      });
    } else {
      setSelectedChecklist(null);
    }
  };

  const createActive = ({
    businessId,
    checklistId,
    title,
  }: {
    businessId: null | string;
    checklistId: string;
    title: string;
  }) =>
    createActiveChecklist({
      onCompleted: () => {
        void refetch();
        setSelectedChecklist(null);
      },
      variables: {
        data: {
          businessId,
          checklistId,
          title,
        },
      },
    });

  const [recycleChecklist] = useRecycleChecklistMutation();
  const deleteTemplate = (templateId: string) => {
    void recycleChecklist({
      update: (cache, { data: d }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (d?.recycleChecklist) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          cache.modify({
            fields: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/default-param-last
              checklists(existingChecklists = [], { readField }) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
                return existingChecklists.filter(
                  (checklistRef: never) =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    templateId !== readField('id', checklistRef)
                );
              },
            },
          });
        }
      },
      variables: {
        recycleChecklistId: templateId,
      },
    });
  };
  const [recycleActiveChecklist] = useRecycleActiveChecklistMutation({
    onCompleted: () => {
      setSaving(false);

      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The checklist has been deleted! ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),

        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const deleteChecklist = (value: string) => {
    void recycleActiveChecklist({
      update: (store, { data: res }) => {
        if (
          res?.recycleActiveChecklist === null ||
          res?.recycleActiveChecklist === undefined
        )
          return;

        const existingData = store.readQuery<ActiveChecklistsQuery>({
          query: ActiveChecklistsDocument,
          variables: activeChecklistVariables,
        });

        if (!existingData?.activeChecklists) return;

        store.writeQuery<ActiveChecklistsQuery>({
          data: {
            __typename: 'Query',
            activeChecklists: {
              ...existingData.activeChecklists,
              edges: existingData.activeChecklists.edges.filter(
                ({ node }) => node.id !== res.recycleActiveChecklist.id
              ),
              totalCount: existingData.activeChecklists.totalCount - 1,
            },
          },
          query: ActiveChecklistsDocument,
          variables: activeChecklistVariables,
        });
      },
      variables: {
        recycleActiveChecklistId: value,
      },
    });
  };
  return {
    activeChecklistSort,
    activeChecklistsData,
    activeChecklistsLoading,
    activeTab: checklistFilter.checklistsTab,
    checklistFilter,
    checklistSort,
    createActive,
    createChecklistOpen: selectedChecklist !== null,
    data,
    deleteChecklist,
    deleteTemplate,
    loading,
    saving,
    selectedChecklist,
    setActiveChecklistSort,
    setChecklistFilters,
    setChecklistSort,
    toggleCreateChecklistDrawer,
  };
};

export default useChecklists;
