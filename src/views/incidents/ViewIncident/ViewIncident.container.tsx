import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ViewIncident.view';
import useViewIncident from './useViewIncident';

const ViewIncident = (): JSX.Element => {
  const incidentId = useParams().id || '';
  const {
    data,
    loading,
    saving,
    openLightbox,
    addOffenderRights,
    onDelete,
    deleteRights,
    editRights,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
  } = useViewIncident(incidentId);

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
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
