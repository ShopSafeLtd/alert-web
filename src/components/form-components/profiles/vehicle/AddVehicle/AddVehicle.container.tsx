import React from 'react';
import type { VehicleData } from 'types/DataType';

import View from './AddVehicle.view';
import useAddVehicle from './useAddVehicle';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  isIncident?: boolean | undefined;
}

const AddVehicle = ({ onClose, update, isIncident }: Props): JSX.Element => {
  const {
    onSubmit,
    CrimeGroupsData,
    CrimeGroupsLoading,
    saving,
    offendersData,
    incidentsData,
    linkIncident,
    linkOffender,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateOffendersList,
    removeOffender,
    removeIncident,
    adminRights,
  } = useAddVehicle({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      CrimeGroupsData={CrimeGroupsData}
      CrimeGroupsLoading={CrimeGroupsLoading}
      saving={saving}
      offendersData={offendersData}
      incidentsData={incidentsData}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      toggleLinkIncident={toggleLinkIncident}
      toggleLinkOffender={toggleLinkOffender}
      updateIncidentList={updateIncidentList}
      updateOffendersList={updateOffendersList}
      removeOffender={removeOffender}
      removeIncident={removeIncident}
      adminRights={adminRights}
      isIncident={!!isIncident}
    />
  );
};

export default AddVehicle;
