import React from 'react';
import View from './OrigDashboard.view';
import useFeedItems from './useFeedItems';

const FeedItems = (): JSX.Element => {
  const {
    data,
    loading,
    recentOffenderData,
    recentOffenderLoading,
    setOrder,
    setSearch,
    groups,
    groupsLoading,
    variables,
    onDeleteFeedItem,
    saving,
    adminRights,
    setTypesFilter,
    setGroupsFilter,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setGallery,
    setCreatedAtFilter,
    fetchMoreScroll,
    lightboxElements,
    openLightbox,
    lightBoxOpen,
  } = useFeedItems();

  return (
    <View
      fetchMoreScroll={fetchMoreScroll}
      data={data}
      loading={loading}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      variables={variables}
      setSearch={setSearch}
      onDeleteFeedItem={onDeleteFeedItem}
      saving={saving}
      adminRights={adminRights}
      setTypesFilter={setTypesFilter}
      setGroupsFilter={setGroupsFilter}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      setOrder={setOrder}
      groups={groups}
      groupsLoading={groupsLoading}
      setGallery={setGallery}
      setCreatedAtFilter={setCreatedAtFilter}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
    />
  );
};

export default FeedItems;
