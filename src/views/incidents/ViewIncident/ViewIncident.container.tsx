import React from "react";
import View from "./ViewIncident.view";
import useViewIncident from "./useViewIncident";

const ViewIncident = () => {
  const {
    data,
    loading,
    openLightbox,
    addOffenderRights,
    incidentId,
    onDelete,
    deleteRights,
    editRights,
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
    />
  );
};

export default ViewIncident;
