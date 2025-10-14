import React from 'react';
import { useParams } from 'react-router-dom';

import View from './ViewIncident.view';
import useViewIncident from './useViewIncident';

const ViewIncident = (): JSX.Element => {
  const incidentId = useParams().id || '';
  const {
    data,
    deleteRights,
    editAddress,
    editImages,
    editRights,
    hasApprovePermission,
    hideIncident,
    incidentStatuses,
    loading,
    onEditAddress,
    onStatusChange,
    saving,
    setSaving,
    showAiDetails,
    statusLoading,
    toggleEditAddress,
    toggleEditImages,
    toggleShowAiDetails,
    userId,
  } = useViewIncident(incidentId);

  return (
    <View
      data={data}
      deleteRights={deleteRights}
      editAddress={editAddress}
      editImages={editImages}
      editRights={editRights}
      hasApprovePermission={hasApprovePermission}
      hideIncident={hideIncident}
      incidentId={incidentId}
      incidentStatuses={incidentStatuses}
      loading={loading}
      onEditAddress={onEditAddress}
      onStatusChange={onStatusChange}
      saving={saving}
      setSaving={setSaving}
      showAiDetails={showAiDetails}
      statusLoading={statusLoading}
      toggleEditAddress={toggleEditAddress}
      toggleEditImages={toggleEditImages}
      toggleShowAiDetails={toggleShowAiDetails}
      userId={userId}
    />
  );
};

export default ViewIncident;
