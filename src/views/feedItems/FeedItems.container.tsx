import React from 'react';
import View from './FeedItems.view';
import useFeedItems from './useFeedItems';

const FeedItems = (): JSX.Element => {
  const {
    data,
    loading,
    articleData,
    articleLoading,
    recentOffenderData,
    recentOffenderLoading,
    onPaginationChange,
    pagination,
    articlePagination,
    onArticlePaginationChange,
    // search,
    setSearch,
    unapprovedIncidents,
    unapprovedIncidentsLoading,
    // updateIncidentList,
    // onNavigate,
    onDeleteFeedItem,
    saving,
    adminRights,
  } = useFeedItems();

  return (
    <View
      data={data}
      loading={loading}
      articleData={articleData}
      articleLoading={articleLoading}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      articlePagination={articlePagination}
      onArticlePaginationChange={onArticlePaginationChange}
      // search={search}
      setSearch={setSearch}
      unapprovedIncidents={unapprovedIncidents}
      unapprovedIncidentsLoading={unapprovedIncidentsLoading}
      onDeleteFeedItem={onDeleteFeedItem}
      saving={saving}
      adminRights={adminRights}
      // updateIncidentList={updateIncidentList}
      // onNavigate={onNavigate}
    />
  );
};

export default FeedItems;
