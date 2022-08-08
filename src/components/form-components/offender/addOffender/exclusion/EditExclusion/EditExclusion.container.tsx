import React from 'react';
import View from './EditExclusion.view';
import useEditExclusion from './useEditExclusion';

interface BanData {
  id?: string | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description: string;
}
interface Props {
  onClose: () => void;
  banData: BanData | null;
  update: (value: BanData) => void;
}

const EditExclusion = ({ onClose, banData, update }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    setStartDate,
    disabledStartDate,
    setEndDate,
    disabledEndDate,
  } = useEditExclusion({
    onClose,
    update,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      banData={banData}
      saving={saving}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      disabledStartDate={disabledStartDate}
      disabledEndDate={disabledEndDate}
    />
  );
};

export default EditExclusion;
