import React from 'react';

import View from './ListIncidentStatuses.view';
import useListIncidentStatuses from './useListIncidentStatuses';

const ListIncidentStatuses = () => {
  const {
    createDrawerOpen,
    data,
    editDrawerOpen,
    loading,
    onCloseCreateDrawer,
    onCloseEditDrawer,
    onDelete,
    onOpenCreateDrawer,
    onOpenEditDrawer,
    selectedStatus,
  } = useListIncidentStatuses();

  return (
    <View
      createDrawerOpen={createDrawerOpen}
      data={data}
      editDrawerOpen={editDrawerOpen}
      loading={loading}
      onCloseCreateDrawer={onCloseCreateDrawer}
      onCloseEditDrawer={onCloseEditDrawer}
      onDelete={onDelete}
      onOpenCreateDrawer={onOpenCreateDrawer}
      onOpenEditDrawer={onOpenEditDrawer}
      selectedStatus={selectedStatus}
    />
  );
};

export default ListIncidentStatuses;
