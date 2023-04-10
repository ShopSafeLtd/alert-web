import React from 'react';
import type { CrimeGroupData, OffenderData, VehicleData } from 'types/DataType';
import type { ListOffendersQuery } from 'graphql/generated';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import View from './Profiles.view';
import useProfiles from './useProfiles';

interface Props {
  crimeGroupsData: CrimeGroupData[];
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onChange?: (data: OffenderData[]) => void;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeCrimeGroup: (crimeGroupId: string) => void;
  removeOffender: (offenderId: string) => void;
  removeVehicle: (vehicleId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setSearchOffenders: (value: string) => void;
  titleOrder: number;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  updateOffender: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  value?: OffenderData[];
  vehiclesData: VehicleData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
}

const Profiles = ({
  crimeGroupsData,
  offenderImgChange: offenderImgChangeParent,
  offendersData,
  onChange,
  recentOffenderData,
  recentOffenderLoading,
  removeCrimeGroup: removeCrimeGroupParent,
  removeOffender: removeOffenderParent,
  removeVehicle: removeVehicleParent,
  saving,
  searchOffenders,
  setSearchOffenders,
  titleOrder,
  updateCrimeGroupsData: updateCrimeGroupsDataParent,
  updateOffender: updateOffenderParent,
  updateVehiclesData: updateVehiclesDataParent,
  value,
  vehiclesData,
  onAddOffender: onAddOffenderParent,
}: Props) => {
  const {
    addExistingCrimeGroup,
    addExistingOffender,
    addExistingVehicle,
    addNewCrimeGroup,
    addNewVehicle,
    addOffender,
    addRecentOffender,
    editCrimeGroupId,
    editOffenderId,
    editVehicleId,
    offenderImgChange,
    removeCrimeGroup,
    removeOffender,
    removeVehicle,
    setAddRecentOffender,
    setEditCrimeGroupId,
    setEditOffenderId,
    setEditVehicleId,
    toggleAddExistingCrimeGroup,
    toggleAddExistingOffender,
    toggleAddExistingVehicle,
    toggleAddNewCrimeGroup,
    toggleAddNewVehicle,
    toggleAddOffender,
    updateCrimeGroupsData,
    updateOffender,
    onAddOffender,
    updateVehiclesData,
  } = useProfiles({
    offenderImgChangeParent,
    onChange,
    removeCrimeGroupParent,
    removeOffenderParent,
    removeVehicleParent,
    updateCrimeGroupsDataParent,
    updateOffenderParent,
    updateVehiclesDataParent,
    value,
    onAddOffenderParent,
  });

  return (
    <View
      addExistingCrimeGroup={addExistingCrimeGroup}
      addExistingOffender={addExistingOffender}
      addExistingVehicle={addExistingVehicle}
      addNewCrimeGroup={addNewCrimeGroup}
      addNewVehicle={addNewVehicle}
      addOffender={addOffender}
      addRecentOffender={addRecentOffender}
      crimeGroupsData={crimeGroupsData}
      editCrimeGroupId={editCrimeGroupId}
      editOffenderId={editOffenderId}
      editVehicleId={editVehicleId}
      offenderImgChange={offenderImgChange}
      offendersData={offendersData}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      removeCrimeGroup={removeCrimeGroup}
      removeOffender={removeOffender}
      removeVehicle={removeVehicle}
      saving={saving}
      searchOffenders={searchOffenders}
      setAddRecentOffender={setAddRecentOffender}
      setEditCrimeGroupId={setEditCrimeGroupId}
      setEditOffenderId={setEditOffenderId}
      setEditVehicleId={setEditVehicleId}
      setSearchOffenders={setSearchOffenders}
      titleOrder={titleOrder}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      toggleAddNewCrimeGroup={toggleAddNewCrimeGroup}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddOffender={toggleAddOffender}
      updateCrimeGroupsData={updateCrimeGroupsData}
      updateOffender={updateOffender}
      updateVehiclesData={updateVehiclesData}
      vehiclesData={vehiclesData}
      onAddOffender={onAddOffender}
    />
  );
};

export default Profiles;
