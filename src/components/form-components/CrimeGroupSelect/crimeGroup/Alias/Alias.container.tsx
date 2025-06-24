import React from 'react';

import View from './Alias.view';
import useAddGroup from './useAlias';

interface Props {
  onClose: () => void;
}

const AddGroup = ({ onClose }: Props): JSX.Element => {
  const { data, loading, onSubmit, saving } = useAddGroup({
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

export default AddGroup;
