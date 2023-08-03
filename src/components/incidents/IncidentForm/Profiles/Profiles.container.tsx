import React from 'react';
import type { FormInstance } from 'antd';
import type { FormData } from 'views/incidents/AddIncident/useAddIncident';
import View from './Profiles.view';
import useProfiles from './useProfiles';

interface Props {
  saving: boolean;
  form: FormInstance<FormData>;
}

const Profiles = ({ saving, form }: Props) => {
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
      saving={saving}
      form={form}
      addExistingOffenderOpen={addExistingOffenderOpen}
      addExistingVehicleOpen={addExistingVehicleOpen}
      addNewOffenderOpen={addNewOffenderOpen}
      addNewVehicleOpen={addNewVehicleOpen}
      toggleAddExisingVehicleOpen={toggleAddExisingVehicleOpen}
      toggleAddExistingOffenderOpen={toggleAddExistingOffenderOpen}
      toggleAddNewOffenderOpen={toggleAddNewOffenderOpen}
      toggleAddNewVehicleOpen={toggleAddNewVehicleOpen}
    />
  );
};

export default Profiles;
