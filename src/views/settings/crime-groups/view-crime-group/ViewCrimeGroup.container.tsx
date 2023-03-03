import React from 'react';
import View from './ViewCrimeGroup.view';
import useViewCrimeGroup from './useViewCrimeGroup';

const ViewCrimeGroup = () => {
  const {
    data,
    loading,
    saving,
    offenderIds,
    vehicleIds,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    addNewVehicle,
    addExistingVehicle,
    toggleAddNewVehicle,
    toggleAddExistingVehicle,
    onDeleteCrimeGroup,
    addAlias,
    toggleAddAlias,
  } = useViewCrimeGroup();

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      addOffender={addOffender}
      toggleAddOffender={toggleAddOffender}
      addExistingOffender={addExistingOffender}
      toggleAddExistingOffender={toggleAddExistingOffender}
      addNewVehicle={addNewVehicle}
      addExistingVehicle={addExistingVehicle}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      offenderIds={offenderIds}
      vehicleIds={vehicleIds}
      onDeleteCrimeGroup={onDeleteCrimeGroup}
      addAlias={addAlias}
      toggleAddAlias={toggleAddAlias}
    />
  );
};

export default ViewCrimeGroup;
