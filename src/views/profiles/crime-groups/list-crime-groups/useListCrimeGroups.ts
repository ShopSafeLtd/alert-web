import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  Role,
  useSchemeGroupsQuery,
  QueryMode,
  SortOrder,
  useListCrimeGroupsQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';
import type { DateType } from 'types/DataType';

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  order: SortOrder;
  setOrder: (value: SortOrder) => void;
  addInvestigation: string;
  toggleAddInvestigation: (value: string) => void;
}

const useListCrimeGroups = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, id: userId } = useStoreState((state) => state.user);
  const [search, setSearch] = useState('');
  const [sortFilter, setSortFilter] = useState(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [gallery, setGallery] = useState<string[]>([]);
  const [addInvestigation, setAddInvestigation] = useState('');
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [createdAtFilter, setCreatedAtFilter] = useState<
    DateType | undefined
  >();
  const variables = {
    order: {
      updatedAt: SortOrder.Desc,
    },
    where: {
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
          }
        : undefined,
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
      OR: [
        {
          alias: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          reference: {
            equals: Number(search),
          },
        },
        {
          offenders: {
            some: {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: QueryMode.Insensitive,
                  },
                },
              ],
            },
          },
        },
      ],
    },
  };
  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    // @ts-expect-error TODO fix this date issue
    variables,
  });
  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
  });
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const clearFilters = () => {
    setGroupsFilter([]);
    setOrder(SortOrder.Desc);
    setCreatedAtFilter(undefined);
  };

  return {
    data,
    loading,
    search,
    setSearch,
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    groupsFilter,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    gallery,
    setGallery,
    order,
    setOrder,
    addInvestigation,
    toggleAddInvestigation: setAddInvestigation,
  };
};

export default useListCrimeGroups;
