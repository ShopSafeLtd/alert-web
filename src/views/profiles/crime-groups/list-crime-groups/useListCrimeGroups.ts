import type {
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables,
} from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type { CrimeGroupFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Return {
  addInvestigation: string;
  clearFilters: () => void;
  data: ListCrimeGroupsQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleAddInvestigation: (value: string) => void;
  toggleSortFilter: () => void;
  variables: CrimeGroupFilters;
}
const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['10', '20', '30'];
  }
  if (window.innerWidth > 1799) {
    return ['10', '20', '30'];
  }
  return ['10'];
};
const useListCrimeGroups = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const { filterDefaultGroups: defaultGroups, id: userId } = useStoreState(
    (state) => state.user
  );

  const pagination = useStoreState(
    (state) => state.data.crimeGroups.pagination
  );
  const filterVariables = useStoreState(
    (state) => state.data.crimeGroups.variables
  );
  const setFilterState = useStoreActions(
    (actions) => actions.data.setCrimeGroups
  );

  const [sortFilter, setSortFilter] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState('');
  const {
    createdAt: createdAtFilter,
    gallery,
    groups: groupsFilter,
    order,
    search,
  } = filterVariables;
  const variables: ListCrimeGroupsQueryVariables = {
    order: {
      updatedAt: order,
    },
    where: {
      OR: [
        {
          alias: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          referenceStr: {
            contains: search,
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
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : {
              some: {
                users: {
                  some: {
                    id: {
                      equals: userId,
                    },
                  },
                },
              },
            },
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },
      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
    },
  };

  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    if (groupsFilter.length === 0) {
      setFilterState({
        pagination: {
          ...pagination,
          pageSize: Number(sizeOptions[0]),
          sizeOptions,
        },
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    } else {
      setFilterState({
        pagination: {
          ...pagination,
          pageSize: Number(sizeOptions[0]),
          sizeOptions,
        },
        variables: filterVariables,
      });
    }
  }, []);
  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const { groups, groupsLoading } = useGroupsContext();

  const setGallery = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        gallery: values,
      },
    });
  };

  const setCreatedAtFilter = (values: DateType | undefined) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        createdAt: values,
      },
    });
  };

  const setOrder = (values: SortOrder) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        order: values,
      },
    });
  };

  const setSearch = (value: string) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        search: value,
      },
    });
  };
  const setGroupsFilter = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        groups: values,
      },
    });
  };
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const clearFilters = () => {
    setFilterState({
      pagination,
      variables: {
        createdAt: undefined,
        gallery: [],
        groups: [],
        order: SortOrder.Desc,
        search: '',
      },
    });
  };

  return {
    addInvestigation,
    clearFilters,
    data,
    groups,
    groupsLoading,
    loading,
    setCreatedAtFilter,
    setGallery,
    setGroupsFilter,
    setOrder,
    setSearch,
    sortFilter,
    toggleAddInvestigation: setAddInvestigation,
    toggleSortFilter,
    variables: filterVariables,
  };
};

export default useListCrimeGroups;
