import React from 'react';
import View from './EditCrimeType.view';
import useEditCrimeType from './useEditCrimeType';

interface Props {
  onClose: () => void;
  incidentId: string | undefined;
}

const EditCrimeType = ({ onClose, incidentId }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving } = useEditCrimeType({
    onClose,
    incidentId,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      saving={saving}
    />
  );
};

export default EditCrimeType;
