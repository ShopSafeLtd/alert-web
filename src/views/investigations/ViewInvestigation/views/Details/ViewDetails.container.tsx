import React from 'react';
import View from './ViewDetails.view';
import useViewDetails from './useViewDetails';

interface Props {
  investigationId: string;
}

const ViewDetails = ({ investigationId }: Props) => {
  const {
    data,
    loading,

    offenderIds,
    vehicleIds,
    incidentIds,
    crimeGroupIds,
    addExistingOffender,
    toggleAddExistingOffender,
    addExistingVehicle,
    toggleAddExistingVehicle,
    addExistingCrimeGroup,
    toggleAddExistingCrimeGroup,
    addExistingIncident,
    toggleAddExistingIncident,
  } = useViewDetails({ investigationId });

  return (
    <View
      data={data}
      loading={loading}
      addExistingOffender={addExistingOffender}
      toggleAddExistingOffender={toggleAddExistingOffender}
      addExistingVehicle={addExistingVehicle}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      offenderIds={offenderIds}
      vehicleIds={vehicleIds}
      incidentIds={incidentIds}
      crimeGroupIds={crimeGroupIds}
      addExistingCrimeGroup={addExistingCrimeGroup}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      addExistingIncident={addExistingIncident}
      toggleAddExistingIncident={toggleAddExistingIncident}
    />
  );
};

export default ViewDetails;
