import React from 'react';
import View from './Alias.view';
import useAddGroup from './useAlias';

interface Props {
  onClose: () => void;
}

const AddGroup = ({ onClose }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving } = useAddGroup({
    onClose,
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

export default AddGroup;
