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
    loading,
    onEditAddress,
    saving,
    setSaving,
    showAiDetails,
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
      loading={loading}
      onEditAddress={onEditAddress}
      saving={saving}
      setSaving={setSaving}
      showAiDetails={showAiDetails}
      toggleEditAddress={toggleEditAddress}
      toggleEditImages={toggleEditImages}
      toggleShowAiDetails={toggleShowAiDetails}
      userId={userId}
    />
  );
};

export default ViewIncident;
