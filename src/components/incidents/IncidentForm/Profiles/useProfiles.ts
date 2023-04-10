import { useState } from 'react';
import type { ListOffendersQuery } from 'graphql/generated';
import type { CrimeGroupData, OffenderData, VehicleData } from 'types/DataType';
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
  removeCrimeGroupParent: (crimeGroupId: string) => void;
  removeOffenderParent: (offenderId: string) => void;
  removeVehicleParent: (vehicleId: string) => void;
  updateCrimeGroupsDataParent: (value: CrimeGroupData) => void;
  updateOffenderParent: (value: OffenderData) => void;
  updateVehiclesDataParent: (value: VehicleData) => void;
  onAddOffenderParent: (value: OffenderData, existing: boolean) => void;
  value?: OffenderData[];
}

interface Return {
  addExistingCrimeGroup: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addNewCrimeGroup: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  addRecentOffender: Offender | null;
  editCrimeGroupId: string;
  editOffenderId: string;
  editVehicleId: string;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  removeCrimeGroup: (crimeGroupId: string) => void;
  removeOffender: (offenderId: string) => void;
  removeVehicle: (vehicleId: string) => void;
  setAddRecentOffender: (value: Offender | null) => void;
  setEditCrimeGroupId: (value: string) => void;
  setEditOffenderId: (value: string) => void;
  setEditVehicleId: (value: string) => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddNewCrimeGroup: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  updateOffender: (value: OffenderData) => void;
  updateOffenderParent: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  onAddOffender: (value: OffenderData, existing: boolean) => void;
}

const useProfiles = ({
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
}: Props): Return => {
  const [addExistingCrimeGroup, setAddExistingCrimeGroup] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [addNewCrimeGroup, setAddNewCrimeGroup] = useState(false);
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [addRecentOffender, setAddRecentOffender] = useState<Offender | null>(
    null
  );
  const [editCrimeGroupId, setEditCrimeGroupId] = useState<string>('');
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
  const toggleAddNewCrimeGroup = () => {
    setAddNewCrimeGroup(!addNewCrimeGroup);
  };
  const toggleAddExistingCrimeGroup = () => {
    setAddExistingCrimeGroup(!addExistingCrimeGroup);
  };

  const updateCrimeGroupsData = (data: CrimeGroupData) => {
    updateCrimeGroupsDataParent(data);
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
  const removeCrimeGroup = (id: string) => {
    removeCrimeGroupParent(id);
  };
  const removeOffender = (id: string) => {
    removeOffenderParent(id);
    if (onChange && value) onChange(value.filter((item) => item.id !== id));
  };
  const removeVehicle = (id: string) => {
    removeVehicleParent(id);
  };

  return {
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
    removeCrimeGroup,
    removeOffender,
    removeVehicle,
    updateOffenderParent,
  };
};

export default useProfiles;
