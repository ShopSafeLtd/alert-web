import React from 'react';

import View from './AddExclusion.view';
import useAddExclusion from './useAddExclusion';

interface BanData {
  id: string;
  title?: string | null | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description?: string | null | undefined;
}
interface Props {
  onClose: () => void;
  update: (value: BanData) => void;
}

const AddExclusion = ({ update, onClose }: Props): JSX.Element => {
  const { onSubmit, saving, setStartDate, disabledDate } = useAddExclusion({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      setStartDate={setStartDate}
      disabledDate={disabledDate}
    />
  );
};

export default AddExclusion;
