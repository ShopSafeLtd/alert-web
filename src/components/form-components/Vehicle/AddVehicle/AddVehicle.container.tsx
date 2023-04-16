// import type { MutationUpdaterFn } from '@apollo/client';
// import type { CreateVehicleMutation } from 'graphql/generated';
import React from 'react';
import type { VehicleData } from 'types/DataType';
import View from './AddVehicle.view';
import useAddVehicle from './useAddVehicle';

interface Props {
  onClose: () => void;
  // update: MutationUpdaterFn<CreateVehicleMutation>;
  update: (value: VehicleData) => void;
  fromIncident?: boolean | undefined;
  fromOffender?: boolean | undefined;
  saving?: boolean;
}

const AddVehicle = ({
  onClose,
  update,
  fromIncident,
  fromOffender,
  saving,
}: Props): JSX.Element => {
  const {
    onSubmit,
    CrimeGroupsData,
    CrimeGroupsLoading,
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
      imgChange={imgChange}
      beforeUpload={beforeUpload}
      fileList={fileList}
      fromIncident={fromIncident}
      fromOffender={fromOffender}
    />
  );
};

export default AddVehicle;
