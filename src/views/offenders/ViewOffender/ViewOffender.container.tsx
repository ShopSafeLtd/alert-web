import React from 'react';
import View from './ViewOffender.view';
import useViewOffender from './useViewOffender';

const ViewOffender = (): JSX.Element => {
  const {
    data,
    saving,
    loading,
    openLightbox,
    addOffenderRights,
    offenderId,
    onDelete,
    deleteRights,
    editRights,
    addExistingIncident,
    toggleAddExistingIncident,
    updateIncidentList,
  } = useViewOffender();

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      openLightbox={openLightbox}
      addOffenderRights={addOffenderRights}
      offenderId={offenderId}
      onDelete={onDelete}
      deleteRights={deleteRights}
      editRights={editRights}
      addExistingIncident={addExistingIncident}
      toggleAddExistingIncident={toggleAddExistingIncident}
      updateIncidentList={updateIncidentList}
    />
  );
};

export default ViewOffender;
