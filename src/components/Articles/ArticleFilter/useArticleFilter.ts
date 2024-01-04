import type { ArticlePriority } from 'graphql/generated';
import { SortOrder, Role, useSchemeGroupsQuery } from 'graphql/generated';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'state';
import type { DateType } from 'types/DataType';
import type { ArticleFilters } from 'state/data-model';

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
  const {
    role,
    id: userId,
    filterDefaultGroups: defaultGroups,
  } = useStoreState((state) => state.user);
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
          groups: defaultGroups.map(({ id }) => id),
        },
      });
    }
  }, []);

  // Fetch scheme groups if scheme admin
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
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
    groups:
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    clearFilters,
    setGroupsFilter,
    setCreatedAtFilter,
    filterVariables,
  };
};

export default useArticleFilter;
