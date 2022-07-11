import React from 'react';
import View from './EditOffender.view';
import useEditOffender from './useEditOffender';

interface Props {
  onClose: () => void;
  offenderId: string;
}

const EditOffender = ({ onClose, offenderId }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving } = useEditOffender({
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

export default EditOffender;
