import type { CrimeGroupCardData } from 'types/DataType';

import React from 'react';

import View from './AddCrimeGroup.view';
import useAddCrimeGroup from './useAddCrimeGroup';

interface Props {
  onClose: () => void;
  saving?: boolean;
  update: (value: CrimeGroupCardData) => void;
}

const AddCrimeGroup = ({ onClose, saving, update }: Props): JSX.Element => {
  const {
    form,
    linkOffender,
    linkVehicle,
    offendersData,
    onSubmit,
    removeOffender,
    removeVehicle,
    toggleLinkOffender,
    toggleLinkVehicle,
    updateOffendersList,
    updateVehiclesList,
    vehiclesData,
  } = useAddCrimeGroup({
    update,
  });

  return (
    <View
      form={form}
      linkOffender={linkOffender}
      linkVehicle={linkVehicle}
      offendersData={offendersData}
      onClose={onClose}
      onSubmit={onSubmit}
      removeOffender={removeOffender}
      removeVehicle={removeVehicle}
      saving={saving}
      toggleLinkOffender={toggleLinkOffender}
      toggleLinkVehicle={toggleLinkVehicle}
      updateOffendersList={updateOffendersList}
      updateVehiclesList={updateVehiclesList}
      vehiclesData={vehiclesData}
    />
  );
};

export default AddCrimeGroup;
