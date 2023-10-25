import React from 'react';
import View from './ArticleFeed.view';
import useArticleFeed from './useArticleFeed';

const ArticleFeed = (): JSX.Element => {
  const {
    data,
    loading,
    order,
    setOrder,
    search,
    setSearch,
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
    fetchMoreScroll,
  } = useArticleFeed();

  return (
    <View
      fetchMoreScroll={fetchMoreScroll}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
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
