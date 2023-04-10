import React from 'react';
import View from './AddBusiness.view';
import useAddBusiness from './useAddBusiness';

interface Props {
  onClose: () => void;
}

const AddBusiness = ({ onClose }: Props) => {
  const { onSubmit, onSearchBusiness, saving } = useAddBusiness({ onClose });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      onSearchBusiness={onSearchBusiness}
      saving={saving}
    />
  );
};

export default AddBusiness;
