import React from 'react';
import View from './EditExclusion.view';
import useEditExclusion from './useEditExclusion';

interface Props {
  onClose: () => void;
  banId: string | undefined;
}

const EditExclusion = ({ onClose, banId }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving, setStartDate, disabledDate } =
    useEditExclusion({
      onClose,
      banId,
    });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      saving={saving}
      setStartDate={setStartDate}
      disabledDate={disabledDate}
    />
  );
};

export default EditExclusion;
