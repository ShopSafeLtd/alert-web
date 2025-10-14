import type { BanData } from 'types/DataType';

import React from 'react';

import View from './EditExclusion.view';
import useEditExclusion from './useEditExclusion';

interface Props {
  banData: BanData | null;
  onClose: () => void;
  update: (value: BanData) => void;
}

const EditExclusion = ({ banData, onClose, update }: Props): JSX.Element => {
  const { disabledDate, onSubmit, saving, setStartDate } = useEditExclusion({
    banData,
    onClose,
    update,
  });
  return (
    <View
      banData={banData}
      disabledDate={disabledDate}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      setStartDate={setStartDate}
    />
  );
};

export default EditExclusion;
