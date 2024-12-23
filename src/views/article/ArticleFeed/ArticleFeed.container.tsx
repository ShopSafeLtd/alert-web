import React from 'react';

import View from './ArticleFeed.view';
import useArticleFeed from './useArticleFeed';

const ArticleFeed = (): JSX.Element => {
  const {
    data,
    fetchMoreScroll,
    filterVariables,
    hasCreateRights,
    lightBoxOpen,
    lightboxElements,
    loading,
    onNavigate,
    openLightbox,
    setGallery,
    setSearch,
    sortFilter,
    toggleSortFilter,
    updateArticleList,
  } = useArticleFeed();

  return (
    <View
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      filterVariables={filterVariables}
      hasCreateRights={hasCreateRights}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loading={loading}
      onNavigate={onNavigate}
      openLightbox={openLightbox}
      setGallery={setGallery}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      updateArticleList={updateArticleList}
    />
  );
};

export default ArticleFeed;
