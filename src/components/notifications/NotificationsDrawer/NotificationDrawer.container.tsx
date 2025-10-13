import React from 'react';

import View from './NotificationDrawer.view';
import useNotificationLists from './useNotificationDrawer';

interface Props {
  onClose: () => void;
}

const NotificationsDrawer = ({ onClose }: Props): JSX.Element => {
  const {
    data,
    handleMarkAllRead,
    handleMarkAsRead,
    loading,
    onRefresh,
    refreshing,
    saving,
    toggleTakeAllSchemes,
  } = useNotificationLists();

  return (
    <View
      data={data}
      handleMarkAllRead={handleMarkAllRead}
      handleMarkAsRead={handleMarkAsRead}
      loading={loading}
      onClose={onClose}
      onRefresh={onRefresh}
      refreshing={refreshing}
      saving={saving}
      toggleTakeAllSchemes={toggleTakeAllSchemes}
    />
  );
};

export default NotificationsDrawer;
