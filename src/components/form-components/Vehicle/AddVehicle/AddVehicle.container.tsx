import { MutationUpdaterFn } from '@apollo/client';
import { CreateVehicleMutation } from 'graphql/generated';
import React from 'react';
import View from './AddVehicle.view';
import useAddVehicle from './useAddVehicle';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateVehicleMutation>;
}

const AddVehicle = ({ onClose, update }: Props): JSX.Element => {
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
    />
  );
};

export default AddVehicle;
