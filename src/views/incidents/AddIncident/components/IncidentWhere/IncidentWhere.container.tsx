import React from 'react';
import View from './IncidentWhere.view';
import useIncidentWhere from './useIncidentWhere';
import type { LocationData } from '../../../../../types/DataType';

interface Props {
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  saving: boolean;
  toggleAddNewAddress: () => void;
  newAddressData: LocationData | undefined;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const IncidentWhere = ({
  saving,
  toggleAddNewAddress,
  updateNewAddressData,
  newAddressData,
  formStages,
}: Props) => {
  const { onSearchBusiness } = useIncidentWhere();

  return (
    <View
      onSearchBusiness={onSearchBusiness}
      formStages={formStages}
      newAddressData={newAddressData}
      saving={saving}
      toggleAddNewAddress={toggleAddNewAddress}
      updateNewAddressData={updateNewAddressData}
    />
  );
};

export default IncidentWhere;
