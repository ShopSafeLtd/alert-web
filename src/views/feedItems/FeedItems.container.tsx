import React from 'react';
import View from './FeedItems.view';
import useFeedItems from './useFeedItems';

const FeedItems = (): JSX.Element => {
  const {
    data,
    loading,

    recentOffenderData,
    recentOffenderLoading,
    onPaginationChange,
    pagination,

    search,
    setSearch,

    // updateIncidentList,
    // onNavigate,
    onDeleteFeedItem,
    saving,
    adminRights,
    typesFilter,
    setTypesFilter,
    groupsFilter,
    setGroupsFilter,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    order,
    setOrder,
    groups,
    groupsLoading,
    gallery,
    setGallery,
    setCreatedAtFilter,
    createdAtFilter,
  } = useFeedItems();

  return (
    <View
      data={data}
      loading={loading}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      search={search}
      setSearch={setSearch}
      onDeleteFeedItem={onDeleteFeedItem}
      saving={saving}
      adminRights={adminRights}
      // updateIncidentList={updateIncidentList}
      // onNavigate={onNavigate}
      typesFilter={typesFilter}
      setTypesFilter={setTypesFilter}
      groupsFilter={groupsFilter}
      setGroupsFilter={setGroupsFilter}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      order={order}
      setOrder={setOrder}
      groups={groups}
      groupsLoading={groupsLoading}
      gallery={gallery}
      setGallery={setGallery}
      setCreatedAtFilter={setCreatedAtFilter}
      createdAtFilter={createdAtFilter}
    />
  );
};

export default FeedItems;
