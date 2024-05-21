import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ArticlesSideList.view';
import useArticlesSection from './useArticlesSection';

const ArticlesSideList = (): JSX.Element => {
  const { id: currentId } = useParams();
  const { data, loading, sortFilter, toggleSortFilter, fetchMoreScroll } =
    useArticlesSection();

  return (
    <View
      data={data}
      loading={loading}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      fetchMoreScroll={fetchMoreScroll}
      current={currentId}
    />
  );
};

export default ArticlesSideList;
