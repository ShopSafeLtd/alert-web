import React from 'react';
import type { CrimeGroupCardData } from 'types/DataType';
import View from './EditCrimeGroup.view';
import useEditCrimeGroup from './useEditCrimeGroup';

interface Props {
  editData: CrimeGroupCardData | undefined | null;
  onClose: () => void;
  update: (value: CrimeGroupCardData) => void;
  saving?: boolean;
}

const EditCrimeGroup = ({
  editData,
  onClose,
  update,
  saving,
}: Props): JSX.Element => {
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
  } = useEditCrimeGroup({
    update,
    editData,
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
      editData={editData}
    />
  );
};

export default EditCrimeGroup;
