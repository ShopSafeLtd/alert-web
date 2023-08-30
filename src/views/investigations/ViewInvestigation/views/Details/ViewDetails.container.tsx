import React from 'react';
import View from './ViewDetails.view';
import useViewDetails from './useViewDetails';

interface Props {
  investigationId: string;
  toggleAddExistingOffender: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingVehicle: () => void;
}

const ViewDetails = ({
  investigationId,
  toggleAddExistingOffender,
  toggleAddExistingIncident,
  toggleAddExistingVehicle,
}: Props) => {
  const {
    data,
    loading,
    scrolledToTop,
    loadMore,
    userId,
    editRights,
    saving,
    setEditUpdate,
    confirmDeleteUpdate,
    replyTo,
    setReplyTo,
    handleEditUpdate,
    setEditUpdateInput,
    editUpdateInput,
    editUpdate,
    optionRowShow,
    setOptionRowShow,
    suggestedData,
    toggleViewSuggestedOffenders,
    viewSuggestedOffenders,
    handleConnectIncident,
    handleConnectOffender,
    handleConnectVehicle,
    toggleViewSuggestedIncidents,
    toggleViewSuggestedVehicles,
    viewSuggestedIncidents,
    viewSuggestedVehicles,
  } = useViewDetails({ investigationId });

  return (
    <View
      handleEditUpdate={handleEditUpdate}
      confirmDeleteUpdate={confirmDeleteUpdate}
      setEditUpdate={setEditUpdate}
      editRights={editRights}
      saving={saving}
      userId={userId}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      loadMore={loadMore}
      scrolledToTop={scrolledToTop}
      data={data}
      loading={loading}
      investigationId={investigationId}
      editUpdateInput={editUpdateInput}
      setEditUpdateInput={setEditUpdateInput}
      editUpdate={editUpdate}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingIncident={toggleAddExistingIncident}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      optionRowShow={optionRowShow}
      setOptionRowShow={setOptionRowShow}
      suggestedData={suggestedData}
      toggleViewSuggestedOffenders={toggleViewSuggestedOffenders}
      viewSuggestedOffenders={viewSuggestedOffenders}
      handleConnectIncident={handleConnectIncident}
      handleConnectOffender={handleConnectOffender}
      handleConnectVehicle={handleConnectVehicle}
      toggleViewSuggestedIncidents={toggleViewSuggestedIncidents}
      toggleViewSuggestedVehicles={toggleViewSuggestedVehicles}
      viewSuggestedIncidents={viewSuggestedIncidents}
      viewSuggestedVehicles={viewSuggestedVehicles}
    />
  );
};

export default ViewDetails;
