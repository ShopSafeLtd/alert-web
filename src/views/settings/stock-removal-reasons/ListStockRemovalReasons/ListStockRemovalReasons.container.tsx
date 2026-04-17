import React from 'react';

import View from './ListStockRemovalReasons.view';
import useListStockRemovalReasons from './useListStockRemovalReasons';

const ListStockRemovalReasons = () => {
  const {
    createDrawerOpen,
    editDrawerOpen,
    loading,
    onCloseCreateDrawer,
    onCloseEditDrawer,
    onDelete,
    onOpenCreateDrawer,
    onOpenEditDrawer,
    reasons,
    selectedReason,
  } = useListStockRemovalReasons();

  return (
    <View
      createDrawerOpen={createDrawerOpen}
      editDrawerOpen={editDrawerOpen}
      loading={loading}
      onCloseCreateDrawer={onCloseCreateDrawer}
      onCloseEditDrawer={onCloseEditDrawer}
      onDelete={onDelete}
      onOpenCreateDrawer={onOpenCreateDrawer}
      onOpenEditDrawer={onOpenEditDrawer}
      reasons={reasons}
      selectedReason={selectedReason}
    />
  );
};

export default ListStockRemovalReasons;
