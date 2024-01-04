import React from 'react';
import { Drawer } from 'antd';

import type { CrimeGroupData, VehicleData } from 'types/DataType';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import { useIntl } from 'react-intl';

interface Props {
  addNewVehicle: boolean;
  toggleAddNewVehicle: () => void;
  vehiclesData: VehicleData[];
  addExistingVehicle: boolean;
  toggleAddExistingVehicle: () => void;
  crimeGroupsData: CrimeGroupData[];
  addExistingCrimeGroup: boolean;
  toggleAddExistingCrimeGroup: () => void;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  fromOffender?: boolean;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
}

const ProfileDrawer = ({
  vehiclesData,
  addExistingVehicle,
  toggleAddExistingVehicle,
  crimeGroupsData,
  addExistingCrimeGroup,
  toggleAddExistingCrimeGroup,
  onAddCrimeGroup,
  fromOffender,
  onAddVehicle,
  addNewVehicle,
  toggleAddNewVehicle,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
          id: 'goP1s6',
        })}
        open={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
        bodyStyle={{ overflow: 'hidden' }}
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
            fromOffender={!!fromOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Crime Groups',
          id: '3HDZC+',
        })}
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
};

export default ProfileDrawer;
