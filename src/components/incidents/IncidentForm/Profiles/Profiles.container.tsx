import type { FormInstance } from 'antd';
import type { FormData } from 'views/incidents/AddIncident/useAddIncident';

import React from 'react';

import View from './Profiles.view';
import useProfiles from './useProfiles';

interface Props {
  form: FormInstance<FormData>;
  hasVictims?: boolean;
  // hasVehicles?: boolean;
  hasWitnesses?: boolean;
  saving: boolean;
}

const Profiles = ({
  form,
  hasVictims = false,
  // hasVehicles = true,
  hasWitnesses = false,
  saving,
}: Props) => {
  const {
    addExistingOffenderOpen,
    addExistingVehicleOpen,
    addNewOffenderOpen,
    addNewVehicleOpen,
    toggleAddExisingVehicleOpen,
    toggleAddExistingOffenderOpen,
    toggleAddNewOffenderOpen,
    toggleAddNewVehicleOpen,
  } = useProfiles();

  return (
    <View
      addExistingOffenderOpen={addExistingOffenderOpen}
      addExistingVehicleOpen={addExistingVehicleOpen}
      addNewOffenderOpen={addNewOffenderOpen}
      addNewVehicleOpen={addNewVehicleOpen}
      form={form}
      hasVictims={hasVictims}
      // hasVehicles={hasVehicles}
      hasWitnesses={hasWitnesses}
      saving={saving}
      toggleAddExisingVehicleOpen={toggleAddExisingVehicleOpen}
      toggleAddExistingOffenderOpen={toggleAddExistingOffenderOpen}
      toggleAddNewOffenderOpen={toggleAddNewOffenderOpen}
      toggleAddNewVehicleOpen={toggleAddNewVehicleOpen}
    />
  );
};

export default Profiles;
