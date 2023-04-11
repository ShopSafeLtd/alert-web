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
  removeVehicle: (vehicleId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setSearchOffenders: (value: string) => void;
  titleOrder: number;
  updateOffender: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  value?: OffenderData[];
  vehiclesData: VehicleData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
}

const Profiles = ({
  offenderImgChange: offenderImgChangeParent,
  offendersData,
  onChange,
  recentOffenderData,
  recentOffenderLoading,
  removeOffender: removeOffenderParent,
  removeVehicle: removeVehicleParent,
  saving,
  searchOffenders,
  setSearchOffenders,
  titleOrder,
  updateOffender: updateOffenderParent,
  updateVehiclesData: updateVehiclesDataParent,
  value,
  vehiclesData,
  onAddOffender: onAddOffenderParent,
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
    removeVehicle,
    setAddRecentOffender,
    setEditOffenderId,
    setEditVehicleId,
    toggleAddExistingOffender,
    toggleAddExistingVehicle,
    toggleAddNewVehicle,
    toggleAddOffender,
    updateOffender,
    onAddOffender,
    updateVehiclesData,
  } = useProfiles({
    offenderImgChangeParent,
    onChange,
    removeOffenderParent,
    removeVehicleParent,
    updateOffenderParent,
    updateVehiclesDataParent,
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
      removeVehicle={removeVehicle}
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
      updateVehiclesData={updateVehiclesData}
      vehiclesData={vehiclesData}
      onAddOffender={onAddOffender}
    />
  );
};

export default Profiles;
