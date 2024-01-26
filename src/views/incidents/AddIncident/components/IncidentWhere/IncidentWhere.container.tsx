import React from 'react';
import View from './IncidentWhere.view';
import useIncidentWhere from './useIncidentWhere';
import type { LocationData } from '../../../../../types/DataType';

interface Props {
  saving: boolean;
  toggleAddNewAddress: () => void;
  newAddressData: LocationData | undefined;
  updateNewAddressData: (value: LocationData | undefined) => void;
  showSiteNumber: boolean;
}

const IncidentWhere = ({
  saving,
  toggleAddNewAddress,
  updateNewAddressData,
  newAddressData,
  showSiteNumber,
}: Props) => {
  const { onSearchBusiness, hideField } = useIncidentWhere({ showSiteNumber });

  return (
    <View
      onSearchBusiness={onSearchBusiness}
      newAddressData={newAddressData}
      saving={saving}
      toggleAddNewAddress={toggleAddNewAddress}
      updateNewAddressData={updateNewAddressData}
      hideField={hideField}
      showSiteNumber={showSiteNumber}
    />
  );
};

export default IncidentWhere;
