import type { LocationData } from 'types/DataType';

import React from 'react';

import View from './AddLocation.view';
import useAddLocation from './useAddLocation';

interface Props {
  locationData?: LocationData;
  onClose: () => void;
  showAlias?: boolean;
  update: (value: LocationData) => void;
}
const AddLocation = ({
  locationData,
  onClose,
  showAlias,
  update,
}: Props): JSX.Element => {
  const { form, location, onSubmit, saving, setLocation } = useAddLocation({
    locationData,
    onClose,
    update,
  });

  return (
    <div>
      <View
        form={form}
        location={location}
        locationData={locationData}
        onClose={onClose}
        onSubmit={onSubmit}
        saving={saving}
        setLocation={setLocation}
        showAlias={showAlias}
      />
    </div>
  );
};

export default AddLocation;
