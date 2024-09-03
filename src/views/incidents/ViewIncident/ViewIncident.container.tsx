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
    hideIncident,
    loading,
    onEditAddress,
    saving,
    setSaving,
    toggleEditAddress,
    toggleEditImages,
    userId,
    userRole,
  } = useViewIncident(incidentId);

  return (
    <View
      data={data}
      deleteRights={deleteRights}
      editAddress={editAddress}
      editImages={editImages}
      editRights={editRights}
      hideIncident={hideIncident}
      incidentId={incidentId}
      loading={loading}
      onEditAddress={onEditAddress}
      saving={saving}
      setSaving={setSaving}
      toggleEditAddress={toggleEditAddress}
      toggleEditImages={toggleEditImages}
      userId={userId}
      userRole={userRole}
    />
  );
};

export default ViewIncident;
