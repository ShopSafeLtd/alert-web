import React from 'react';

import View from './EditCrimeType.view';
import useEditCrimeType from './useEditCrimeType';

interface Props {
  incidentId: string | undefined;
  onClose: () => void;
}

const EditCrimeType = ({ incidentId, onClose }: Props): JSX.Element => {
  const {
    data,
    generatingDescription,
    loading,
    onGenerateDescription,
    onSubmit,
    saving,
  } = useEditCrimeType({
    incidentId,
    onClose,
  });
  return (
    <View
      data={data}
      generatingDescription={generatingDescription}
      loading={loading}
      onClose={onClose}
      onGenerateDescription={onGenerateDescription}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default EditCrimeType;
