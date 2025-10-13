import type { CrimeGroupData, VehicleData } from 'types/DataType';

import { Drawer } from 'antd';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  addExistingCrimeGroup: boolean;
  addExistingVehicle: boolean;
  addNewVehicle: boolean;
  crimeGroupsData: CrimeGroupData[];
  fromOffender?: boolean;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddNewVehicle: () => void;
  vehiclesData: VehicleData[];
}

const ProfileDrawer = ({
  addExistingCrimeGroup,
  addExistingVehicle,
  addNewVehicle,
  crimeGroupsData,
  fromOffender,
  onAddCrimeGroup,
  onAddVehicle,
  toggleAddExistingCrimeGroup,
  toggleAddExistingVehicle,
  toggleAddNewVehicle,
  vehiclesData,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleAddExistingVehicle}
        open={addExistingVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
        })}
        width="800"
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            onClose={toggleAddExistingVehicle}
            update={(data) => onAddVehicle(data, true)}
            vehicleIds={vehiclesData.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddNewVehicle}
        open={addNewVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
        })}
        width="700"
        zIndex={999}
      >
        {addNewVehicle ? (
          <AddVehicle
            fromOffender={!!fromOffender}
            onClose={toggleAddNewVehicle}
            update={(data) => {
              onAddVehicle(data, false);
              toggleAddNewVehicle();
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddExistingCrimeGroup}
        open={addExistingCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Crime Groups',
        })}
        width="800"
        zIndex={1001}
      >
        {addExistingCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={crimeGroupsData.map(({ id }) => id)}
            onClose={toggleAddExistingCrimeGroup}
            update={onAddCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
