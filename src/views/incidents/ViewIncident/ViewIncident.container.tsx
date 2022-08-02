import React from 'react';
import View from './ViewIncident.view';
import useViewIncident from './useViewIncident';

const ViewIncident = (): JSX.Element => {
  const {
    data,
    loading,
    openLightbox,
    addOffenderRights,
    incidentId,
    onDelete,
    deleteRights,
    editRights,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
  } = useViewIncident();

  return (
    <View
      data={data}
      loading={loading}
      openLightbox={openLightbox}
      addOffenderRights={addOffenderRights}
      incidentId={incidentId}
      onDelete={onDelete}
      deleteRights={deleteRights}
      editRights={editRights}
      addExistingOffender={addExistingOffender}
      toggleAddExistingOffender={toggleAddExistingOffender}
      updateOffenderList={updateOffenderList}
    />
  );
};

export default ViewIncident;
