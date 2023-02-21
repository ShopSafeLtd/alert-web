import React from 'react';
import View from './ViewVehicle.view';
import useViewVehicle from './useViewVehicle';

const ViewVehicle = () => {
  const {
    data,
    loading,
    saving,
    editVehicle,
    toggleEditVehicle,
    onDeleteVehicle,
  } = useViewVehicle();

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      editVehicle={editVehicle}
      toggleEditVehicle={toggleEditVehicle}
      onDeleteVehicle={onDeleteVehicle}
    />
  );
};

export default ViewVehicle;
