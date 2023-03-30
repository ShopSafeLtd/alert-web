import React from 'react';
import type { BanData } from 'types/DataType';
import View from './EditExclusion.view';
import useEditExclusion from './useEditExclusion';

interface Props {
  onClose: () => void;
  banData: BanData | null;
  update: (value: BanData) => void;
}

const EditExclusion = ({ onClose, banData, update }: Props): JSX.Element => {
  const { onSubmit, saving, setStartDate, disabledDate } = useEditExclusion({
    onClose,
    banData,
    update,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      banData={banData}
      saving={saving}
      setStartDate={setStartDate}
      disabledDate={disabledDate}
    />
  );
};

export default EditExclusion;
