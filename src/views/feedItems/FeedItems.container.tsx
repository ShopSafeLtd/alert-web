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
    order,
    setOrder,
    search,
    setSearch,
    groups,
    groupsLoading,
    onGroupsChange,
    variables,
    // updateIncidentList,
    // onNavigate,
  } = useFeedItems();

  return (
    <View
      data={data}
      loading={loading}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
      groups={groups}
      groupsLoading={groupsLoading}
      onGroupsChange={onGroupsChange}
      variables={variables}
      // updateIncidentList={updateIncidentList}
      // onNavigate={onNavigate}
    />
  );
};

export default FeedItems;
