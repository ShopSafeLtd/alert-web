import React from 'react';

import View from './NotificationDrawer.view';
import useNotificationLists from './useNotificationDrawer';

interface Props {
  onClose: () => void;
}

const NotificationsDrawer = ({ onClose }: Props): JSX.Element => {
  const {
    data,
    loading,
    saving,
    toggleTakeAllSchemes,
    handleMarkAsRead,
    handleMarkAllRead,
    onRefresh,
    refreshing,
  } = useNotificationLists();

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      toggleTakeAllSchemes={toggleTakeAllSchemes}
      handleMarkAsRead={handleMarkAsRead}
      handleMarkAllRead={handleMarkAllRead}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onClose={onClose}
    />
  );
};

export default NotificationsDrawer;
