import React from 'react';
import { VehicleData } from 'types/DataType';
import View from './EditVehicle.view';
import useEditVehicle from './useEditVehicle';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  editData: VehicleData | undefined;
}

const EditVehicle = ({ onClose, update, editData }: Props): JSX.Element => {
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
  } = useEditVehicle({
    onClose,
    update,
    editData,
  });

  return (
    <View
      onSubmit={onSubmit}
      data={editData}
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
    />
  );
};

export default EditVehicle;
