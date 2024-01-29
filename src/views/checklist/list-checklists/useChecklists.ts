import type { FetchResult } from '@apollo/client';
import { useState } from 'react';
import type {
  ActiveChecklistsQuery,
  ChecklistsQuery,
  CreateActiveChecklistMutation,
} from '../../../graphql/generated';
import {
  useActiveChecklistsQuery,
  useChecklistsQuery,
  useCreateActiveChecklistMutation,
  useRecycleChecklistMutation,
} from '../../../graphql/generated';
import { useStoreActions, useStoreState } from '../../../state';
import type {
  ActiveChecklistSortOptions,
  ChecklistSortOptions,
  ChecklistSortOrder,
  FilterModelValues,
  SetChecklistFilterModel,
} from '../../../state/filter-model';

interface Return {
  data: ChecklistsQuery | undefined;
  loading: boolean;
  activeChecklistsData: ActiveChecklistsQuery | undefined;
  activeChecklistsLoading: boolean;
  createActive: ({
    checklistId,
    businessId,
    title,
  }: {
    checklistId: string;
    businessId: string | null;
    title: string;
  }) => Promise<FetchResult<CreateActiveChecklistMutation>>;
  activeTab: string;
  checklistFilter: FilterModelValues;
  setChecklistFilters: (filters: SetChecklistFilterModel) => void;
  setChecklistSort: (args: {
    field: ChecklistSortOptions;
    order: ChecklistSortOrder;
  }) => void;
  setActiveChecklistSort: (args: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  }) => void;

  createChecklistOpen: boolean;
  selectedChecklist: { id: string; title: string } | null;
  toggleCreateChecklistDrawer: (
    args: { checklistId: string; title: string } | null
  ) => void;
  checklistSort: {
    field: ChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  deleteTemplate: (id: string) => void;
}

const useChecklists = (): Return => {
  const { checklistFilter, checklistSort, activeChecklistSort } = useStoreState(
    (state) => state.filter
  );
  const { setChecklistFilters, setChecklistSort, setActiveChecklistSort } =
    useStoreActions((state) => state.filter);
  const schemeId = useStoreState((state) => state.scheme.id);
  const { id: userId } = useStoreState((state) => state.user);
  const { data, loading } = useChecklistsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: { id: { equals: schemeId } },
        },
        deleted: { equals: false },
        users: checklistFilter.ownUser
          ? { some: { id: { equals: userId } } }
          : undefined,
        business: checklistFilter.businesses?.length
          ? { some: { id: { in: checklistFilter.businesses } } }
          : undefined,
      },
      order: {
        [checklistSort.field]: checklistSort.order,
      },
    },
  });

  const {
    data: activeChecklistsData,
    loading: activeChecklistsLoading,
    refetch,
  } = useActiveChecklistsQuery({
    fetchPolicy: 'cache-and-network',

    variables: {
      where: {
        status: {
          in: checklistFilter.activeStatus,
        },
        OR: [
          {
            checklist: {
              schemes: {
                some: { id: { equals: schemeId } },
              },
              business: checklistFilter.businesses?.length
                ? { some: { id: { in: checklistFilter.businesses } } }
                : undefined,
            },
          },
          {
            checklist: {
              schemes: {
                some: { id: { equals: schemeId } },
              },
            },
            business: checklistFilter.businesses?.length
              ? { id: { in: checklistFilter.businesses } }
              : undefined,

            completedBy: checklistFilter.ownUser
              ? { id: { equals: userId } }
              : undefined,
          },
        ],
      },
      order: {
        [activeChecklistSort.field]: activeChecklistSort.order,
      },
    },
  });

  const [createActiveChecklist] = useCreateActiveChecklistMutation();

  const [selectedChecklist, setSelectedChecklist] = useState<null | {
    id: string;
    title: string;
  }>(null);

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
    checklistId,
    businessId,
    title,
  }: {
    checklistId: string;
    businessId: string | null;
    title: string;
  }) =>
    createActiveChecklist({
      variables: {
        data: {
          checklistId,
          businessId,
          title,
        },
      },
      onCompleted: () => {
        void refetch();
        setSelectedChecklist(null);
      },
    });

  const [recycleChecklist] = useRecycleChecklistMutation();
  const deleteTemplate = (templateId: string) => {
    void recycleChecklist({
      variables: {
        recycleChecklistId: templateId,
      },
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
    });
  };

  return {
    data,
    loading,
    activeChecklistsData,
    activeChecklistsLoading,
    createActive,
    activeTab: checklistFilter.checklistsTab,
    checklistFilter,
    setChecklistFilters,
    createChecklistOpen: selectedChecklist !== null,
    toggleCreateChecklistDrawer,
    selectedChecklist,
    setActiveChecklistSort,
    setChecklistSort,
    checklistSort,
    activeChecklistSort,
    deleteTemplate,
  };
};

export default useChecklists;
