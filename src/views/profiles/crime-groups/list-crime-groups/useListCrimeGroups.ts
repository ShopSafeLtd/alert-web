import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListCrimeGroupsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';
import type { CrimeGroupFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';
import { useGroupsContext } from '#/context/groups-context';

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setOrder: (value: SortOrder) => void;
  addInvestigation: string;
  toggleAddInvestigation: (value: string) => void;
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
  const { id: userId, filterDefaultGroups: defaultGroups } = useStoreState(
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
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    gallery,
    order,
  } = filterVariables;
  const variables = {
    order: {
      updatedAt: order,
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
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
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
    },
  };

  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    if (groupsFilter.length === 0) {
      setFilterState({
        pagination: {
          ...pagination,
          sizeOptions,
          pageSize: Number(sizeOptions[0]),
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
          sizeOptions,
          pageSize: Number(sizeOptions[0]),
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
        order: SortOrder.Desc,
        search: '',
        createdAt: undefined,
        gallery: [],
        groups: [],
      },
    });
  };

  return {
    data,
    loading,
    setSearch,
    groups,
    groupsLoading,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    setGallery,
    setOrder,
    addInvestigation,
    toggleAddInvestigation: setAddInvestigation,
    variables: filterVariables,
  };
};

export default useListCrimeGroups;
