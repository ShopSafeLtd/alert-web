import React from 'react';
import { Drawer } from 'antd';

import type { CrimeGroupData, VehicleData } from 'types/DataType';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import EditVehicle from 'components/form-components/Vehicle/EditVehicle';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';

interface Props {
  addNewVehicle: boolean;
  toggleAddNewVehicle: () => void;
  vehiclesData: VehicleData[];
  addExistingVehicle: boolean;
  toggleAddExistingVehicle: () => void;
  editVehicleId: string;
  setEditVehicleId: (value: string) => void;
  crimeGroupsData: CrimeGroupData[];
  addExistingCrimeGroup: boolean;
  toggleAddExistingCrimeGroup: () => void;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  fromOffender?: boolean;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onEditVehicle: (data: VehicleData) => void;
}

const ProfileDrawer = ({
  vehiclesData,
  addExistingVehicle,
  editVehicleId,
  setEditVehicleId,
  toggleAddExistingVehicle,
  crimeGroupsData,
  addExistingCrimeGroup,
  toggleAddExistingCrimeGroup,
  onAddCrimeGroup,
  fromOffender,
  onAddVehicle,
  onEditVehicle,
  addNewVehicle,
  toggleAddNewVehicle,
}: Props): JSX.Element => (
  <>
    <Drawer
      title="Add Existing Vehicles"
      open={addExistingVehicle}
      width="800"
      onClose={toggleAddExistingVehicle}
      zIndex={1001}
    >
      {addExistingVehicle ? (
        // <AddExistingVehicle
        //   update={updateVehiclesData}
        //   vehicleIds={vehiclesData.map(({ id }) => id)}
        //   onClose={toggleAddExistingVehicle}
        // />
        <LinkVehicle
          update={(data) => onAddVehicle(data, true)}
          vehicleIds={vehiclesData.map(({ id }) => id)}
          onClose={toggleAddExistingVehicle}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add New Vehicle"
      open={addNewVehicle}
      width="700"
      zIndex={999}
      onClose={toggleAddNewVehicle}
    >
      {addNewVehicle ? (
        <AddVehicle
          update={(data) => onAddVehicle(data, false)}
          onClose={toggleAddNewVehicle}
          fromOffender={!!fromOffender}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Vehicle Details"
      open={!!editVehicleId}
      width="700"
      zIndex={999}
      onClose={() => setEditVehicleId('')}
    >
      {editVehicleId ? (
        <EditVehicle
          fromOffender={!!fromOffender}
          onClose={() => setEditVehicleId('')}
          update={onEditVehicle}
          editData={vehiclesData.find(({ id }) => id === editVehicleId)}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add Existing Crime Groups"
      open={addExistingCrimeGroup}
      width="800"
      onClose={toggleAddExistingCrimeGroup}
      zIndex={1001}
    >
      {addExistingCrimeGroup ? (
        <LinkCrimeGroup
          update={onAddCrimeGroup}
          crimeGroupIds={crimeGroupsData.map(({ id }) => id)}
          onClose={toggleAddExistingCrimeGroup}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </>
);
export default ProfileDrawer;
