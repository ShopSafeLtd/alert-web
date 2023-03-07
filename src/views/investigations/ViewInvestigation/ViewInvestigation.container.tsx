import React from 'react';

import { useParams } from 'react-router-dom';
import View from './ViewInvestigation.view';
import useViewCustomer from './useViewInvestigation';

const ViewCustomer: React.FC = () => {
  const { id } = useParams();

  const {
    data,
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
  } = useViewCustomer(id || '');
  return (
    <View
      data={data}
      addExistingOffender={addExistingOffender}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      vehicleIds={vehicleIds}
      crimeGroupIds={crimeGroupIds}
      addExistingCrimeGroup={addExistingCrimeGroup}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      addExistingIncident={addExistingIncident}
      toggleAddExistingIncident={toggleAddExistingIncident}
      addExistingVehicle={addExistingVehicle}
      offenderIds={offenderIds}
      incidentIds={incidentIds}
    />
  );
};

export default ViewCustomer;
