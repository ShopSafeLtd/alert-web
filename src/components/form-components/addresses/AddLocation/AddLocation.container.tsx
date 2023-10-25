import React from 'react';
import type { LocationData } from 'types/DataType';
import useAddLocation from './useAddLocation';
import View from './AddLocation.view';

interface Props {
  onClose: () => void;
  update: (value: LocationData) => void;
  locationData?: LocationData;
  showAlias?: boolean;
}
const AddLocation = ({
  onClose,
  update,
  locationData,
  showAlias,
}: Props): JSX.Element => {
  const { onSubmit, saving, location, setLocation, form } = useAddLocation({
    onClose,
    update,
    locationData,
  });

  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        location={location}
        setLocation={setLocation}
        form={form}
        locationData={locationData}
        showAlias={showAlias}
      />
    </div>
  );
};

export default AddLocation;
