import React from 'react';
import { useParams } from 'react-router-dom';

import View from './ArticlesSideList.view';
import useArticlesSection from './useArticlesSection';

const ArticlesSideList = (): JSX.Element => {
  const { id: currentId } = useParams();
  const { data, fetchMoreScroll, loading, sortFilter, toggleSortFilter } =
    useArticlesSection();

  return (
    <View
      current={currentId}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
    />
  );
};

export default ArticlesSideList;
