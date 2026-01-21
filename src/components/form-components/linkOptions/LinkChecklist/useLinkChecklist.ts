import type {
  ActiveChecklistSortOptions,
  ChecklistSortOrder,
  FilterModelValues,
} from '#/state/filter-model';
import type { ChecklistData } from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  currentSchemeGroups,
  currentUserAtom,
} from '#/providers/UserProvider/UserProvider';
import { useStoreState } from '#/state';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

import type { LinkActiveChecklistsQuery } from './__generated__/link-active-checklist.generated';

import { useLinkActiveChecklistsQuery } from './__generated__/link-active-checklist.generated';

// interface Checklist {
//   checklist: ChecklistData;
// }
interface Props {
  checklistIds: string[] | undefined;
  getChecklist?: (value: { checklist: ChecklistData }) => void;
  onClose: () => void;
  update?: (value: ChecklistData) => void;
}

interface Return {
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  checklistFilter: FilterModelValues;
  data: LinkActiveChecklistsQuery | undefined;
  loading: boolean;
  // onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const useLinkChecklist = ({
  checklistIds,
  getChecklist,
  onClose,
  update,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const { activeChecklistSort, checklistFilter } = useStoreState(
    (state) => state.filter
  );
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const userGroups = useAtomValue(currentSchemeGroups);
  const userGroupIds = userGroups?.map((g) => g.id) || [];

  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   pageSize: 24,
  // });
  const {
    data,
    loading,
    // refetch,
  } = useLinkActiveChecklistsQuery({
    fetchPolicy: 'cache-and-network',

    variables: {
      order: {
        [activeChecklistSort.field]: activeChecklistSort.order,
      },
      // skip: (pagination.page - 1) * pagination.pageSize,
      // take: pagination.pageSize,
      where: {
        OR: [
          {
            checklist: {
              OR: [
                // Case 1: Public checklists (no restrictions)
                {
                  groups: { none: {} },
                  roles: { none: {} },
                  users: { none: {} },
                },
                // Case 2: Named user override (direct assignment)
                {
                  users: { some: { id: { equals: userId } } },
                },
                // Case 3: Has role AND in group (when both specified)
                {
                  AND: [
                    {
                      roles: {
                        some: {
                          users: {
                            some: { userId: { equals: userId } },
                          },
                        },
                      },
                    },
                    {
                      groups: {
                        some: {
                          id: { in: userGroupIds },
                        },
                      },
                    },
                  ],
                },
                // Case 4: Has role only (no groups specified)
                {
                  groups: { none: {} },
                  roles: {
                    some: {
                      users: {
                        some: { userId: { equals: userId } },
                      },
                    },
                  },
                },
                // Case 5: In group only (no roles specified)
                {
                  groups: {
                    some: {
                      id: { in: userGroupIds },
                    },
                  },
                  roles: { none: {} },
                },
              ],
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
              OR: [
                // Case 1: Public checklists (no restrictions)
                {
                  groups: { none: {} },
                  roles: { none: {} },
                  users: { none: {} },
                },
                // Case 2: Named user override (direct assignment)
                {
                  users: { some: { id: { equals: userId } } },
                },
                // Case 3: Has role AND in group (when both specified)
                {
                  AND: [
                    {
                      roles: {
                        some: {
                          users: {
                            some: { userId: { equals: userId } },
                          },
                        },
                      },
                    },
                    {
                      groups: {
                        some: {
                          id: { in: userGroupIds },
                        },
                      },
                    },
                  ],
                },
                // Case 4: Has role only (no groups specified)
                {
                  groups: { none: {} },
                  roles: {
                    some: {
                      users: {
                        some: { userId: { equals: userId } },
                      },
                    },
                  },
                },
                // Case 5: In group only (no roles specified)
                {
                  groups: {
                    some: {
                      id: { in: userGroupIds },
                    },
                  },
                  roles: { none: {} },
                },
              ],
              schemes: {
                some: { id: { equals: schemeId } },
              },
            },
          },
        ],
        id: { notIn: checklistIds },
        status: {
          in: checklistFilter.activeStatus,
        },
      },
    },
  });

  const onSubmit = () => {
    setSaving(true);
    const selectedData = data?.activeChecklists.edges.find(
      ({ node }) => node.id === selected
    )?.node;
    if (selectedData) {
      if (update) {
        update({
          business: selectedData.business,
          id: selectedData.id,
          name: selectedData.name,
          percentComplete: selectedData.percentComplete || 0,
          percentageScore: selectedData.percentageScore,
          status: selectedData.status,
        });
      }
      if (getChecklist) {
        getChecklist({ checklist: selectedData });
      }
    }
    setSaving(false);
    onClose();
  };

  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };
  // const onPaginationChange = (page: number) => {
  //   setPagination({
  //     ...pagination,
  //     page,
  //   });
  // };
  return {
    activeChecklistSort,
    checklistFilter,
    data,
    loading,
    // onPaginationChange,
    onSelect,
    onSubmit,
    saving,
  };
};

export default useLinkChecklist;
