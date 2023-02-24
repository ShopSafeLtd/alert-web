import React from 'react';
import { Drawer } from 'antd';
import AddVehicle from 'components/form-components/profiles/vehicle/AddVehicle';
import EditVehicle from 'components/form-components/profiles/vehicle/EditVehicle';
import AddExistingVehicle from 'components/form-components/profiles/vehicle/AddExistingVehicle';
import AddExistingCrimeGroup from 'components/form-components/profiles/crimeGroup/AddExistingCrimeGroup';
import AddCrimeGroup from 'components/form-components/profiles/crimeGroup/AddCrimeGroup';
import { CrimeGroupData, VehicleData } from 'types/DataType';

interface Props {
  vehiclesData: VehicleData[];
  addNewVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddNewVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleId: string;
  setEditVehicleId: (value: string) => void;
  updateVehiclesData: (value: VehicleData) => void;
  crimeGroupsData: CrimeGroupData[];
  addNewCrimeGroup: boolean;
  addExistingCrimeGroup: boolean;
  toggleAddNewCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  editCrimeGroupId: string;
  setEditCrimeGroupId: (value: string) => void;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
}

const ProfileDrawer = ({
  vehiclesData,
  addNewVehicle,
  addExistingVehicle,
  editVehicleId,
  setEditVehicleId,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  updateVehiclesData,
  crimeGroupsData,
  addNewCrimeGroup,
  addExistingCrimeGroup,
  editCrimeGroupId,
  setEditCrimeGroupId,
  toggleAddNewCrimeGroup,
  toggleAddExistingCrimeGroup,
  updateCrimeGroupsData,
}: Props): JSX.Element => (
  <>
    <Drawer
      title="Add Existing Vehicles"
      visible={addExistingVehicle}
      width="800"
      onClose={toggleAddExistingVehicle}
      zIndex={1001}
    >
      {addExistingVehicle ? (
        <AddExistingVehicle
          update={updateVehiclesData}
          vehicleIds={vehiclesData.map(({ id }) => id)}
          onClose={toggleAddExistingVehicle}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add New Vehicle"
      visible={addNewVehicle}
      width="600"
      onClose={toggleAddNewVehicle}
    >
      {addNewVehicle ? (
        <AddVehicle update={updateVehiclesData} onClose={toggleAddNewVehicle} />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Vehicle Details"
      visible={!!editVehicleId}
      width="600"
      onClose={() => setEditVehicleId('')}
    >
      {editVehicleId ? (
        <EditVehicle
          onClose={() => setEditVehicleId('')}
          update={updateVehiclesData}
          editData={vehiclesData.find(({ id }) => id === editVehicleId)}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add Existing Crime Groups"
      visible={addExistingCrimeGroup}
      width="800"
      onClose={toggleAddExistingCrimeGroup}
      zIndex={1001}
    >
      {addExistingCrimeGroup ? (
        <AddExistingCrimeGroup
          update={updateCrimeGroupsData}
          crimeGroupIds={crimeGroupsData.map(({ id }) => id)}
          onClose={toggleAddExistingCrimeGroup}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add New Crime Group"
      visible={addNewCrimeGroup}
      width="600"
      onClose={toggleAddNewCrimeGroup}
    >
      {addNewCrimeGroup ? (
        <AddCrimeGroup
          update={updateCrimeGroupsData}
          onClose={toggleAddNewCrimeGroup}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Crime Group Details"
      visible={!!editCrimeGroupId}
      width="600"
      onClose={() => setEditCrimeGroupId('')}
    >
      {editCrimeGroupId ? (
        <EditVehicle
          onClose={() => setEditCrimeGroupId('')}
          update={updateVehiclesData}
          editData={vehiclesData.find(({ id }) => id === editVehicleId)}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </>
);
export default ProfileDrawer;
