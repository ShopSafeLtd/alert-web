import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ViewOffender.view';
import useViewOffender from './useViewOffender';

const ViewOffender = (): JSX.Element => {
  const offenderId = useParams().id || '';

  const {
    data,
    saving,
    loading,
    openLightbox,
    addIncidentRights,
    onDelete,
    deleteRights,
    editRights,
    addExistingIncident,
    toggleAddExistingIncident,
    updateIncidentList,
  } = useViewOffender(offenderId);

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      openLightbox={openLightbox}
      addIncidentRights={addIncidentRights}
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
