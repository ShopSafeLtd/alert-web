import React from 'react';

import View from './NotificationList.view';
import useNotificationLists from './useNotificationList';

const NotificationLists = (): JSX.Element => {
  const {
    data,
    loading,
    saving,
    takeAllSchemes,
    toggleTakeAllSchemes,
    handleMarkAsRead,
    handleMarkAllRead,
    setSearch,
    onPaginationChange,
    currentPage,
    currentPageSize,
  } = useNotificationLists();
  console.log('data', data?.notifications);

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      takeAllSchemes={takeAllSchemes}
      toggleTakeAllSchemes={toggleTakeAllSchemes}
      handleMarkAsRead={handleMarkAsRead}
      handleMarkAllRead={handleMarkAllRead}
      setSearch={setSearch}
      onPaginationChange={onPaginationChange}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
    />
  );
};

export default NotificationLists;
