import React from 'react';
import View from './IncidentWhere.view';
import useIncidentWhere from './useIncidentWhere';
import type { LocationData } from '../../../../../types/DataType';

interface Props {
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
}: Props) => {
  const { onSearchBusiness, hideField } = useIncidentWhere();

  return (
    <View
      onSearchBusiness={onSearchBusiness}
      newAddressData={newAddressData}
      saving={saving}
      toggleAddNewAddress={toggleAddNewAddress}
      updateNewAddressData={updateNewAddressData}
      hideField={hideField}
    />
  );
};

export default IncidentWhere;
