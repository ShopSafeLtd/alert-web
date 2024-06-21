import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'state';
import type { DateType } from 'types/DataType';
import type { ArticleFilters } from 'state/data-model';
import { useGroupsContext } from '#/context/groups-context';

import type { ArticlePriority } from 'graphql/types';
import { SortOrder } from 'graphql/types';

interface Return {
  clearFilters: () => void;
  setGroupsFilter: (value: string[]) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setOrder: (value: SortOrder) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  filterVariables: ArticleFilters;
}

const useArticleFilter = (): Return => {
  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const { filterDefaultGroups: defaultGroups } = useStoreState(
    (state) => state.user
  );
  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );
  const setFilterState = useStoreActions((actions) => actions.data.setArticles);

  // On mount
  useEffect(() => {
    if (filterVariables.groups.length === 0) {
      setFilterState({
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    }
  }, []);

  const { groups, groupsLoading } = useGroupsContext();

  const setCreatedAtFilter = (values: DateType | undefined) => {
    setFilterState({
      variables: {
        ...filterVariables,
        createdAt: values,
      },
    });
  };

  const setOrder = (values: SortOrder) => {
    setFilterState({
      variables: {
        ...filterVariables,
        order: values,
      },
    });
  };

  const setGroupsFilter = (values: string[]) => {
    setFilterState({
      variables: {
        ...filterVariables,
        groups: values,
      },
    });
  };
  const setPriorityFilter = (values: ArticlePriority[]) => {
    setFilterState({
      variables: {
        ...filterVariables,
        priorities: values,
      },
    });
  };
  const clearFilters = () => {
    setFilterState({
      variables: {
        search: '',
        gallery: [],
        order: SortOrder.Desc,
        createdAt: undefined,
        groups: [],
        priorities: [],
      },
    });
  };
  return {
    setOrder,
    setPriorityFilter,
    groups,
    groupsLoading,
    clearFilters,
    setGroupsFilter,
    setCreatedAtFilter,
    filterVariables,
  };
};

export default useArticleFilter;
