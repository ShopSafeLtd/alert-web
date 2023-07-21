import React from 'react';
import type { OffenderData, VehicleData } from 'types/DataType';
import type { ListOffendersQuery } from 'graphql/generated';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import View from './Profiles.view';
import useProfiles from './useProfiles';

interface Props {
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onChange?: (data: OffenderData[]) => void;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeOffender: (offenderId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setSearchOffenders: (value: string) => void;
  updateOffender: (value: OffenderData) => void;
  value?: OffenderData[];
  vehiclesData: VehicleData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onRemoveVehicle: (vehicleId: string) => void;
}

const Profiles = ({
  offenderImgChange: offenderImgChangeParent,
  offendersData,
  onChange,
  recentOffenderData,
  recentOffenderLoading,
  removeOffender: removeOffenderParent,
  saving,
  searchOffenders,
  setSearchOffenders,
  updateOffender: updateOffenderParent,
  value,
  vehiclesData,
  onAddOffender: onAddOffenderParent,
  onAddVehicle,
  onRemoveVehicle,
}: Props) => {
  const {
    addExistingOffender,
    addExistingVehicle,
    addNewVehicle,
    addOffender,
    addRecentOffender,
    editOffenderId,
    offenderImgChange,
    removeOffender,
    setAddRecentOffender,
    setEditOffenderId,
    toggleAddExistingOffender,
    toggleAddExistingVehicle,
    toggleAddNewVehicle,
    toggleAddOffender,
    updateOffender,
    onAddOffender,
  } = useProfiles({
    offenderImgChangeParent,
    onChange,
    removeOffenderParent,
    updateOffenderParent,
    value,
    onAddOffenderParent,
  });

  return (
    <View
      addExistingOffender={addExistingOffender}
      addExistingVehicle={addExistingVehicle}
      addNewVehicle={addNewVehicle}
      addOffender={addOffender}
      addRecentOffender={addRecentOffender}
      editOffenderId={editOffenderId}
      offenderImgChange={offenderImgChange}
      offendersData={offendersData}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      removeOffender={removeOffender}
      saving={saving}
      searchOffenders={searchOffenders}
      setAddRecentOffender={setAddRecentOffender}
      setEditOffenderId={setEditOffenderId}
      setSearchOffenders={setSearchOffenders}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddOffender={toggleAddOffender}
      updateOffender={updateOffender}
      vehiclesData={vehiclesData}
      onAddOffender={onAddOffender}
      onRemoveVehicle={onRemoveVehicle}
      onAddVehicle={onAddVehicle}
    />
  );
};

export default Profiles;
