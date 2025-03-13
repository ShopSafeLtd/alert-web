import React from 'react';

import View from './ArticleFilter.view';
import useArticleFilter from './useArticleFilter';

const ArticleFilter = (): JSX.Element => {
  const {
    clearFilters,
    filterVariables,
    setCreatedAtFilter,
    setGroupsFilter,
    setOrder,
    setPriorityFilter,
    setStatus,
  } = useArticleFilter();

  return (
    <View
      clearFilters={clearFilters}
      filterVariables={filterVariables}
      setCreatedAtFilter={setCreatedAtFilter}
      setGroupsFilter={setGroupsFilter}
      setOrder={setOrder}
      setPriorityFilter={setPriorityFilter}
      setStatus={setStatus}
    />
  );
};

export default ArticleFilter;
