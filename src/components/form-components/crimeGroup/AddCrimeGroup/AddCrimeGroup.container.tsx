import React from 'react';
import type { CrimeGroupCardData } from 'types/DataType';
import View from './AddCrimeGroup.view';
import useAddCrimeGroup from './useAddCrimeGroup';

interface Props {
  onClose: () => void;
  update: (value: CrimeGroupCardData) => void;
  saving?: boolean;
}

const AddCrimeGroup = ({ onClose, update, saving }: Props): JSX.Element => {
  const {
    onSubmit,
    form,
    offendersData,
    vehiclesData,
    linkVehicle,
    linkOffender,
    toggleLinkVehicle,
    toggleLinkOffender,
    updateVehiclesList,
    updateOffendersList,
    removeOffender,
    removeVehicle,
  } = useAddCrimeGroup({
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      form={form}
      offendersData={offendersData}
      vehiclesData={vehiclesData}
      linkVehicle={linkVehicle}
      linkOffender={linkOffender}
      toggleLinkVehicle={toggleLinkVehicle}
      toggleLinkOffender={toggleLinkOffender}
      updateVehiclesList={updateVehiclesList}
      updateOffendersList={updateOffendersList}
      removeOffender={removeOffender}
      removeVehicle={removeVehicle}
    />
  );
};

export default AddCrimeGroup;
