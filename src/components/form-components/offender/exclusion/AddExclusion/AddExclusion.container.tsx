import type { BanData } from 'types/DataType';

import React from 'react';

import View from './AddExclusion.view';
import useAddExclusion from './useAddExclusion';

interface Props {
  onClose: () => void;
  update: (value: BanData) => void;
}

const AddExclusion = ({ onClose, update }: Props): JSX.Element => {
  const { disabledDate, onSubmit, saving, setStartDate } = useAddExclusion({
    onClose,
    update,
  });

  return (
    <View
      disabledDate={disabledDate}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      setStartDate={setStartDate}
    />
  );
};

export default AddExclusion;
