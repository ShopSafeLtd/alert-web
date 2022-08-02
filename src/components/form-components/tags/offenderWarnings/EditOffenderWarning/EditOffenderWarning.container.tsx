import React from 'react';
import View from './EditOffenderWarning.view';
import useEditOffenderWarning from './useEditOffenderWarning';

interface Props {
  onClose: () => void;
  offenderId: string;
}

const EditOffenderWarning = ({ onClose, offenderId }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving } = useEditOffenderWarning({
    onClose,
    offenderId,
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

export default EditOffenderWarning;
