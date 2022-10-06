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
    linkOffender,
    toggleLinkOffender,
    updateOffendersList,
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
      linkOffender={linkOffender}
      toggleLinkOffender={toggleLinkOffender}
      updateOffendersList={updateOffendersList}
    />
  );
};

export default ViewIncident;
