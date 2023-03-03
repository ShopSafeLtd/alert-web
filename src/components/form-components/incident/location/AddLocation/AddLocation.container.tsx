import React from 'react';
import { LocationData } from 'types/DataType';
import useAddOffender from './useAddLocation';
import View from './AddLocation.view';

interface Props {
  onClose: () => void;
  update: (value: LocationData | undefined) => void;
}
function AddOffender({ onClose, update }: Props): JSX.Element {
  const { onSubmit, saving } = useAddOffender({ onClose, update });
  return (
    <div>
      <View onSubmit={onSubmit} onClose={onClose} saving={saving} />
    </div>
  );
}

export default AddOffender;
