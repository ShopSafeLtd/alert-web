import React from 'react';
import View from './FeedItems.view';
import useFeedItems from './useFeedItems';

const FeedItems = (): JSX.Element => {
  const {
    data,
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
  } = useFeedItems();

  return (
    <View
      data={data}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      search={search}
      setSearch={setSearch}
      unapprovedIncidents={unapprovedIncidents}
      unapprovedIncidentsLoading={unapprovedIncidentsLoading}
      // updateIncidentList={updateIncidentList}
      // onNavigate={onNavigate}
    />
  );
};

export default FeedItems;
