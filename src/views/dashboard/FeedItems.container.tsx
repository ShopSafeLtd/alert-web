import React from 'react';
import View from './Dashboard.view';
import useFeedItems from './useFeedItems';

const Dashboard = (): JSX.Element => {
  const {
    data,
    loading,
    recentOffenderData,
    recentOffenderLoading,
    groupsLoading,
    onDeleteFeedItem,
    saving,
    fetchMoreScroll,
  } = useFeedItems();

  return (
    <View
      fetchMoreScroll={fetchMoreScroll}
      data={data}
      loading={loading}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      onDeleteFeedItem={onDeleteFeedItem}
      saving={saving}
      groupsLoading={groupsLoading}
    />
  );
};

export default Dashboard;
