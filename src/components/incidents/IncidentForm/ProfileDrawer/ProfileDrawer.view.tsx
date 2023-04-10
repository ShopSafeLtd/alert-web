import React from 'react';
import { Drawer } from 'antd';
import AddOffender from 'components/form-components/incident/offender/AddNewOffender';
import AddExistingOffender from 'components/form-components/incident/offender/AddExistingOffender';
import EditOffender from 'components/form-components/incident/offender/EditOffender';

import EditVehicle from 'components/form-components/profiles/vehicle/EditVehicle';
// import AddExistingVehicle from 'components/form-components/profiles/vehicle/AddExistingVehicle';
import AddExistingCrimeGroup from 'components/form-components/profiles/crimeGroup/AddExistingCrimeGroup';
import AddCrimeGroup from 'components/form-components/profiles/crimeGroup/AddCrimeGroup';
import type { CrimeGroupData, OffenderData, VehicleData } from 'types/DataType';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';

interface Props {
  addExistingCrimeGroup: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addNewCrimeGroup: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  crimeGroupsData: CrimeGroupData[];
  editCrimeGroupId: string;
  editOffenderId: string;
  editVehicleId: string;
  fromIncident?: boolean;
  offendersData: OffenderData[];
  setEditCrimeGroupId: (value: string) => void;
  setEditOffenderId: (arg0: string) => void;
  setEditVehicleId: (value: string) => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddNewCrimeGroup: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  updateOffender: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
}

const ProfileDrawer = ({
  offendersData,
  addOffender,
  toggleAddOffender,
  addExistingOffender,
  toggleAddExistingOffender,
  editOffenderId,
  setEditOffenderId,
  updateOffender,
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
  fromIncident,
  onAddOffender,
}: Props): JSX.Element => (
  <>
    {/* offeder */}

    <Drawer
      title="Add New Offender"
      visible={addOffender}
      width="600"
      onClose={toggleAddOffender}
      zIndex={1001}
    >
      {addOffender ? (
        <AddOffender
          update={(data) => onAddOffender(data, false)}
          onClose={toggleAddOffender}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add Existing Offenders"
      visible={addExistingOffender}
      width="800"
      onClose={toggleAddExistingOffender}
      zIndex={1001}
    >
      {addExistingOffender ? (
        <AddExistingOffender
          update={(data) => onAddOffender(data, true)}
          offenderIds={offendersData.map(({ id }) => id)}
          onClose={toggleAddExistingOffender}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Offender"
      visible={!!editOffenderId}
      width="1000"
      onClose={() => setEditOffenderId('')}
    >
      {editOffenderId ? (
        <EditOffender
          id={editOffenderId}
          onClose={() => setEditOffenderId('')}
          update={updateOffender}
          // editData={offendersData.find(({ id }) => id === editOffenderId)}
        />
      ) : (
        <div />
      )}
    </Drawer>

    {/* vehicle */}
    <Drawer
      title="Add Existing Vehicles"
      visible={addExistingVehicle}
      width="800"
      onClose={toggleAddExistingVehicle}
      zIndex={1001}
    >
      {addExistingVehicle ? (
        <LinkVehicle
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
        <AddVehicle
          update={updateVehiclesData}
          onClose={toggleAddNewVehicle}
          // fromIncident={fromIncident !== undefined ? fromIncident : false}
          fromIncident={!!fromIncident}
        />
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
    {/* crime group */}
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
