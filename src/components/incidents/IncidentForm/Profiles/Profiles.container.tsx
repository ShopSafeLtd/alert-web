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
  titleOrder: number;
  updateOffender: (value: OffenderData) => void;
  value?: OffenderData[];
  vehiclesData: VehicleData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onEditVehicle: (data: VehicleData) => void;
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
  titleOrder,
  updateOffender: updateOffenderParent,
  value,
  vehiclesData,
  onAddOffender: onAddOffenderParent,
  onAddVehicle,
  onEditVehicle,
  onRemoveVehicle,
}: Props) => {
  const {
    addExistingOffender,
    addExistingVehicle,
    addNewVehicle,
    addOffender,
    addRecentOffender,
    editOffenderId,
    editVehicleId,
    offenderImgChange,
    removeOffender,
    setAddRecentOffender,
    setEditOffenderId,
    setEditVehicleId,
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
      editVehicleId={editVehicleId}
      offenderImgChange={offenderImgChange}
      offendersData={offendersData}
      recentOffenderData={recentOffenderData}
      recentOffenderLoading={recentOffenderLoading}
      removeOffender={removeOffender}
      saving={saving}
      searchOffenders={searchOffenders}
      setAddRecentOffender={setAddRecentOffender}
      setEditOffenderId={setEditOffenderId}
      setEditVehicleId={setEditVehicleId}
      setSearchOffenders={setSearchOffenders}
      titleOrder={titleOrder}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddOffender={toggleAddOffender}
      updateOffender={updateOffender}
      vehiclesData={vehiclesData}
      onAddOffender={onAddOffender}
      onRemoveVehicle={onRemoveVehicle}
      onAddVehicle={onAddVehicle}
      onEditVehicle={onEditVehicle}
    />
  );
};

export default Profiles;
