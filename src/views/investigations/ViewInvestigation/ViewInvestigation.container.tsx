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
    toggleAddDocument,
    addDocument,
    toggleAddDemDocument,
    addDemDocument,
    demId,
    submitOffender,
    submitVehicle,
    submitCrimeGroup,
    submitIncident,
    toggleSubscribe,
    takeAllSchemes,
  } = useViewCustomer(id || '');
  return (
    <View
      demId={demId}
      toggleAddDocument={toggleAddDocument}
      addDocument={addDocument}
      toggleAddDemDocument={toggleAddDemDocument}
      addDemDocument={addDemDocument}
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
      submitOffender={submitOffender}
      submitVehicle={submitVehicle}
      submitCrimeGroup={submitCrimeGroup}
      submitIncident={submitIncident}
      toggleSubscribe={toggleSubscribe}
      takeAllSchemes={takeAllSchemes}
    />
  );
};

export default ViewCustomer;
