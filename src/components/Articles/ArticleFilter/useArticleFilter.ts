import type { ArticlePriority, CompleteStatus } from 'graphql/types';
import type { ArticleFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { SortOrder } from 'graphql/types';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Return {
  clearFilters: () => void;
  filterVariables: ArticleFilters;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setStatus: (value: CompleteStatus[]) => void;
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
  const setStatus = (values: CompleteStatus[]) => {
    setFilterState({
      variables: {
        ...filterVariables,
        status: values,
      },
    });
  };
  const clearFilters = () => {
    setFilterState({
      variables: {
        createdAt: undefined,
        gallery: [],
        groups: [],
        order: SortOrder.Desc,
        priorities: [],
        search: '',
        status: [],
      },
    });
  };
  return {
    clearFilters,
    filterVariables,
    groups,
    groupsLoading,
    setCreatedAtFilter,
    setGroupsFilter,
    setOrder,
    setPriorityFilter,
    setStatus,
  };
};

export default useArticleFilter;
