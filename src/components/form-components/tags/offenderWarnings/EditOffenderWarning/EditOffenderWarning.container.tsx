import React from 'react';

import View from './EditOffenderWarning.view';
import useEditOffenderWarning from './useEditOffenderWarning';

interface Props {
  offenderId: string;
  onClose: () => void;
}

const EditOffenderWarning = ({ offenderId, onClose }: Props): JSX.Element => {
  const { data, loading, onSubmit, saving } = useEditOffenderWarning({
    offenderId,
    onClose,
  });
  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default EditOffenderWarning;
