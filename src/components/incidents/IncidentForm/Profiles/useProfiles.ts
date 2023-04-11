import { useState } from 'react';
import type { ListOffendersQuery } from 'graphql/generated';
import type { OffenderData, VehicleData } from 'types/DataType';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface Props {
  offenderImgChangeParent: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  onChange?: (data: OffenderData[]) => void;
  removeOffenderParent: (offenderId: string) => void;
  removeVehicleParent: (vehicleId: string) => void;
  updateOffenderParent: (value: OffenderData) => void;
  updateVehiclesDataParent: (value: VehicleData) => void;
  onAddOffenderParent: (value: OffenderData, existing: boolean) => void;
  value?: OffenderData[];
}

interface Return {
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  addRecentOffender: Offender | null;
  editOffenderId: string;
  editVehicleId: string;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  removeOffender: (offenderId: string) => void;
  removeVehicle: (vehicleId: string) => void;
  setAddRecentOffender: (value: Offender | null) => void;
  setEditOffenderId: (value: string) => void;
  setEditVehicleId: (value: string) => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  updateOffender: (value: OffenderData) => void;
  updateOffenderParent: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  onAddOffender: (value: OffenderData, existing: boolean) => void;
}

const useProfiles = ({
  offenderImgChangeParent,
  onChange,
  removeOffenderParent,
  removeVehicleParent,
  updateOffenderParent,
  updateVehiclesDataParent,
  value,
  onAddOffenderParent,
}: Props): Return => {
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [addRecentOffender, setAddRecentOffender] = useState<Offender | null>(
    null
  );
  const [editOffenderId, setEditOffenderId] = useState<string>('');
  const [editVehicleId, setEditVehicleId] = useState<string>('');

  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const toggleAddNewVehicle = () => {
    setAddNewVehicle(!addNewVehicle);
  };
  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };

  const updateOffender = (data: OffenderData) => {
    updateOffenderParent(data);
  };
  const onAddOffender = (data: OffenderData, existing: boolean) => {
    onAddOffenderParent(data, existing);
    if (onChange) {
      if (value) {
        onChange([...value, data]);
      } else {
        onChange([data]);
      }
    }
  };
  const updateVehiclesData = (data: VehicleData) => {
    updateVehiclesDataParent(data);
  };
  const offenderImgChange = (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => {
    offenderImgChangeParent(info, currentId);
  };
  const removeOffender = (id: string) => {
    removeOffenderParent(id);
    if (onChange && value) onChange(value.filter((item) => item.id !== id));
  };
  const removeVehicle = (id: string) => {
    removeVehicleParent(id);
  };

  return {
    addExistingOffender,
    addExistingVehicle,
    addNewVehicle,
    addOffender,
    addRecentOffender,
    editOffenderId,
    editVehicleId,
    offenderImgChange,
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
    removeOffender,
    removeVehicle,
    updateOffenderParent,
  };
};

export default useProfiles;
