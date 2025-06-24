import type { CrimeGroupCardData } from 'types/DataType';

import React from 'react';

import View from './EditCrimeGroup.view';
import useEditCrimeGroup from './useEditCrimeGroup';

interface Props {
  editData: CrimeGroupCardData | null | undefined;
  onClose: () => void;
  saving?: boolean;
  update: (value: CrimeGroupCardData) => void;
}

const EditCrimeGroup = ({
  editData,
  onClose,
  saving,
  update,
}: Props): JSX.Element => {
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
  } = useEditCrimeGroup({
    editData,
    update,
  });

  return (
    <View
      editData={editData}
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

export default EditCrimeGroup;
