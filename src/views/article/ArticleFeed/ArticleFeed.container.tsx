import React from 'react';
import View from './ArticleFeed.view';
import useArticleFeed from './useArticleFeed';

const ArticleFeed = (): JSX.Element => {
  const {
    data,
    loading,
    onPaginationChange,
    order,
    setOrder,
    search,
    setSearch,
    currentPage,
    currentPageSize,
    priorityFilter,
    setPriorityFilter,
    groups,
    groupsLoading,
    onNavigate,
    lightboxElements,
    lightBoxOpen,
    openLightbox,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    gallery,
    setGallery,
    groupsFilter,
    setGroupsFilter,
    setCreatedAtFilter,
    updateArticleList,
  } = useArticleFeed();

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      onPaginationChange={onPaginationChange}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      order={order}
      setOrder={setOrder}
      groups={groups}
      groupsLoading={groupsLoading}
      setCreatedAtFilter={setCreatedAtFilter}
      priorityFilter={priorityFilter}
      setPriorityFilter={setPriorityFilter}
      groupsFilter={groupsFilter}
      setGroupsFilter={setGroupsFilter}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      onNavigate={onNavigate}
      gallery={gallery}
      setGallery={setGallery}
      updateArticleList={updateArticleList}
    />
  );
};

export default ArticleFeed;
