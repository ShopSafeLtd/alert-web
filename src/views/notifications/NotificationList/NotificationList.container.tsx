import React from 'react';

import View from './NotificationList.view';
import useNotificationLists from './useNotificationList';

const NotificationLists = (): JSX.Element => {
  const {
    currentPage,
    currentPageSize,
    data,
    handleMarkAllRead,
    handleMarkAsRead,
    loading,
    onPaginationChange,
    saving,
    setSearch,
    takeAllSchemes,
    toggleTakeAllSchemes,
  } = useNotificationLists();

  return (
    <View
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      data={data}
      handleMarkAllRead={handleMarkAllRead}
      handleMarkAsRead={handleMarkAsRead}
      loading={loading}
      onPaginationChange={onPaginationChange}
      saving={saving}
      setSearch={setSearch}
      takeAllSchemes={takeAllSchemes}
      toggleTakeAllSchemes={toggleTakeAllSchemes}
    />
  );
};

export default NotificationLists;
