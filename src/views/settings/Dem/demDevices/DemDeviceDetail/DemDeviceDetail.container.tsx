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
    loading,
    onAssignedBusiness,
    saving,
    toggleAssignToBusiness,
    toggleEditDemDevice,
  } = useDemDeviceDetail(deviceId || '');
  return (
    <div>
      <View
        assignToBusiness={assignToBusiness}
        data={data}
        deleteConfirm={deleteConfirm}
        editDemDevice={editDemDevice}
        loading={loading}
        onAssignedBusiness={onAssignedBusiness}
        saving={saving}
        toggleAssignToBusiness={toggleAssignToBusiness}
        toggleEditDemDevice={toggleEditDemDevice}
      />
    </div>
  );
};

export default DemDeviceDetail;
