import React from 'react';
import View from './RecycleBin.view';
import useRecycleBin from './RecycleBin';

const RecycleBin = (): JSX.Element => {
  const {
    data,
    loading,
    saving,
    currentId,
    setCurrentId,
    recycledId,
    setRecycledId,
    toggleRestore,
    restoreIncident,
    toggleRestoreIncident,
    updateRestoreIncident,
    updateDeleteIncident,
    restoreOffender,
    toggleRestoreOffender,
    updateRestoreOffender,
    updateDeleteOffender,
  } = useRecycleBin();
  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      currentId={currentId}
      setCurrentId={setCurrentId}
      recycledId={recycledId}
      setRecycledId={setRecycledId}
      toggleRestore={toggleRestore}
      restoreIncident={restoreIncident}
      toggleRestoreIncident={toggleRestoreIncident}
      updateRestoreIncident={updateRestoreIncident}
      updateDeleteIncident={updateDeleteIncident}
      restoreOffender={restoreOffender}
      toggleRestoreOffender={toggleRestoreOffender}
      updateRestoreOffender={updateRestoreOffender}
      updateDeleteOffender={updateDeleteOffender}
    />
  );
};

export default RecycleBin;
