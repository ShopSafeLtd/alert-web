import React from 'react';
import View from './EditOffender.view';
import useEditGroup from './useEditOffender';

interface Props {
  onClose: () => void;
  offenderId: string;
}

const EditGroup = ({ onClose, offenderId }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving } = useEditGroup({
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

export default EditGroup;
