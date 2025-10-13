import React from 'react';

import View from './AddJustification.view';
import useAddJustification from './useAddJustification';

interface Props {
  offenderId: string;
  onClose: () => void;
}

const AddJustification = ({ offenderId, onClose }: Props): JSX.Element => {
  const { onSubmit, saving } = useAddJustification({ offenderId, onClose });
  return (
    <div>
      <View onClose={onClose} onSubmit={onSubmit} saving={saving} />
    </div>
  );
};

export default AddJustification;
