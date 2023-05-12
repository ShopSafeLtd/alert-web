import React from 'react';
import type { VehicleData } from 'types/DataType';
import View from './EditVehicle.view';
import useEditVehicle from './useEditVehicle';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  editData: VehicleData | undefined | null;

  // editData:
  //   | Exclude<VehicleQuery['vehicle'], undefined | null>
  //   | undefined
  //   | null;
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
    imgChange,
    beforeUpload,
    fileList,
  } = useEditVehicle({
    onClose,
    update,
    editData,
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
      imgChange={imgChange}
      beforeUpload={beforeUpload}
      fileList={fileList}
      editData={editData}
    />
  );
};

export default EditVehicle;
