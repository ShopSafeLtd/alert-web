import React from 'react';
import { Drawer } from 'antd';
import AddOffender from 'components/form-components/offender/offender/AddNewOffender';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import EditOffender from 'components/form-components/offender/offender/EditOffender';
import type { OffenderData, VehicleData } from 'types/DataType';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import EditVehicle from 'components/form-components/Vehicle/EditVehicle';
import { useIntl } from 'react-intl';

interface Props {
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  editOffenderId: string;
  editVehicleId: string;
  fromIncident?: boolean;
  offendersData: OffenderData[];
  setEditOffenderId: (arg0: string) => void;
  setEditVehicleId: (value: string) => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  updateOffender: (value: OffenderData) => void;
  vehiclesData: VehicleData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onEditVehicle: (data: VehicleData) => void;
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
  fromIncident,
  onAddOffender,
  onAddVehicle,
  onEditVehicle,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      {/* offeder */}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
          id: 'V+RsEq',
        })}
        open={addOffender}
        width="700"
        zIndex={999}
        onClose={toggleAddOffender}
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
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
          id: '1FbM4r',
        })}
        open={addExistingOffender}
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
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
          id: '+OfJ4/',
        })}
        open={!!editOffenderId}
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
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
          id: 'goP1s6',
        })}
        open={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
      >
        {addExistingVehicle ? (
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
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
          id: 'cHbTr7',
        })}
        open={addNewVehicle}
        width="700"
        zIndex={999}
        onClose={toggleAddNewVehicle}
      >
        {addNewVehicle ? (
          <AddVehicle
            update={(data) => {
              onAddVehicle(data, false);
              toggleAddNewVehicle();
            }}
            onClose={toggleAddNewVehicle}
            fromIncident={!!fromIncident}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Vehicle Details',
          id: 'AWN+hV',
        })}
        open={!!editVehicleId}
        width="700"
        zIndex={999}
        onClose={() => setEditVehicleId('')}
      >
        {editVehicleId ? (
          <EditVehicle
            fromIncident
            onClose={() => setEditVehicleId('')}
            update={onEditVehicle}
            editData={vehiclesData.find(({ id }) => id === editVehicleId)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};
export default ProfileDrawer;
