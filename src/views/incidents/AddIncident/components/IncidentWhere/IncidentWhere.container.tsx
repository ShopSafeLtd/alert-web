import type { LocationData } from '#/types/DataType';

import React from 'react';

import View from './IncidentWhere.view';
import useIncidentWhere from './useIncidentWhere';

interface Props {
  newAddressData: LocationData | undefined;
  saving: boolean;
  showSiteNumber: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const IncidentWhere = ({
  newAddressData,
  saving,
  showSiteNumber,
  toggleAddNewAddress,
  updateNewAddressData,
}: Props) => {
  const { hideField, onSearchBusiness } = useIncidentWhere({
    showSiteNumber,
  });

  return (
    <View
      hideField={hideField}
      newAddressData={newAddressData}
      onSearchBusiness={onSearchBusiness}
      saving={saving}
      showSiteNumber={showSiteNumber}
      toggleAddNewAddress={toggleAddNewAddress}
      updateNewAddressData={updateNewAddressData}
    />
  );
};

export default IncidentWhere;
