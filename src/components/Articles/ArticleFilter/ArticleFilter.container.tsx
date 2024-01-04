import React from 'react';
import View from './ArticleFilter.view';
import useArticleFilter from './useArticleFilter';

const ArticleFilter = (): JSX.Element => {
  const {
    clearFilters,
    setGroupsFilter,
    setPriorityFilter,
    setCreatedAtFilter,
    setOrder,
    groups,
    groupsLoading,
    filterVariables,
  } = useArticleFilter();

  return (
    <View
      clearFilters={clearFilters}
      setGroupsFilter={setGroupsFilter}
      setPriorityFilter={setPriorityFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      setOrder={setOrder}
      groups={groups}
      groupsLoading={groupsLoading}
      filterVariables={filterVariables}
    />
  );
};

export default ArticleFilter;
