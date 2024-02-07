import React from 'react';
import View from './ArticleFeed.view';
import useArticleFeed from './useArticleFeed';

const ArticleFeed = (): JSX.Element => {
  const {
    data,
    loading,
    setSearch,
    sortFilter,
    toggleSortFilter,
    // clearFilters,
    // setGroupsFilter,
    // setPriorityFilter,
    // setCreatedAtFilter,
    // setOrder,
    lightboxElements,
    lightBoxOpen,
    openLightbox,
    // groups,
    // groupsLoading,
    onNavigate,
    setGallery,
    updateArticleList,
    fetchMoreScroll,
    filterVariables,
    hasCreateRights,
  } = useArticleFeed();

  return (
    <View
      data={data}
      loading={loading}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      hasCreateRights={hasCreateRights}
      // clearFilters={clearFilters}
      // setGroupsFilter={setGroupsFilter}
      // setPriorityFilter={setPriorityFilter}
      // setCreatedAtFilter={setCreatedAtFilter}
      // setOrder={setOrder}
      lightboxElements={lightboxElements}
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      // groups={groups}
      // groupsLoading={groupsLoading}
      onNavigate={onNavigate}
      setGallery={setGallery}
      updateArticleList={updateArticleList}
      fetchMoreScroll={fetchMoreScroll}
      filterVariables={filterVariables}
    />
  );
};

export default ArticleFeed;
