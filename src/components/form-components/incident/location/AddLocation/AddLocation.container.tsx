import React from 'react';
import useAddOffender from './useAddLocation';
import View from './AddLocation.view';

interface LocationData {
  building?: string | null;
  street: string;
  townCity: string;
  county?: string | null;
  postcode: string;
}
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
