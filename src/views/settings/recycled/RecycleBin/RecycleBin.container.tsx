import React from 'react';

import View from './RecycleBin.view';
import useRecycleBin from './useRecycleBin';

const RecycleBin = (): JSX.Element => {
  const {
    currentId,
    data,
    loading,
    pagination,
    recycledId,
    restoreIncident,
    restoreOffender,
    saving,
    setCurrentId,
    setPagination,
    setRecycledId,
    toggleRestore,
    toggleRestoreIncident,
    toggleRestoreOffender,
    totalCount,
    updateDeleteIncident,
    updateDeleteOffender,
    updateRestoreIncident,
    updateRestoreOffender,
  } = useRecycleBin();
  return (
    <View
      currentId={currentId}
      data={data}
      loading={loading}
      pagination={pagination}
      recycledId={recycledId}
      restoreIncident={restoreIncident}
      restoreOffender={restoreOffender}
      saving={saving}
      setCurrentId={setCurrentId}
      setPagination={setPagination}
      setRecycledId={setRecycledId}
      toggleRestore={toggleRestore}
      toggleRestoreIncident={toggleRestoreIncident}
      toggleRestoreOffender={toggleRestoreOffender}
      totalCount={totalCount}
      updateDeleteIncident={updateDeleteIncident}
      updateDeleteOffender={updateDeleteOffender}
      updateRestoreIncident={updateRestoreIncident}
      updateRestoreOffender={updateRestoreOffender}
    />
  );
};

export default RecycleBin;
