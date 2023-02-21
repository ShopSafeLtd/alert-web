import React from 'react';
import View from './FeedItems.view';
import useFeedItems from './useFeedItems';

const FeedItems = (): JSX.Element => {
  const {
    data,
    articleData,
    recentOffenderData,
    recentOffenderLoading,
    onPaginationChange,
    pagination,
    search,
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
      articleData={articleData}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      search={search}
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
