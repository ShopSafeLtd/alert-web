import React from 'react';
import { useParams } from 'react-router-dom';

import View from './DemDeviceDetail.view';
import useDemDeviceDetail from './useDemDeviceDetail';

const DemDeviceDetail = (): JSX.Element => {
  const deviceId = useParams().id;

  const {
    assignToBusiness,
    data,
    deleteConfirm,
    editDemDevice,
    evidenceData,
    evidenceLoading,
    loading,
    onAssignedBusiness,
    saving,
    toggleAssignToBusiness,
    toggleEditDemDevice,
    updateDeleteEvidenceList,
  } = useDemDeviceDetail(deviceId || '');
  return (
    <div>
      <View
        assignToBusiness={assignToBusiness}
        data={data}
        deleteConfirm={deleteConfirm}
        editDemDevice={editDemDevice}
        evidenceData={evidenceData}
        evidenceLoading={evidenceLoading}
        loading={loading}
        onAssignedBusiness={onAssignedBusiness}
        saving={saving}
        toggleAssignToBusiness={toggleAssignToBusiness}
        toggleEditDemDevice={toggleEditDemDevice}
        updateDeleteEvidenceList={updateDeleteEvidenceList}
      />
    </div>
  );
};

export default DemDeviceDetail;
