import React from 'react';
import type { BusinessData } from 'types/DataType';
import View from './AddBusiness.view';
import useAddBusiness from './useAddBusiness';

interface Props {
  onClose: () => void;
  update: (value: BusinessData) => void;
  saving: boolean;
}

const AddBusiness = ({ onClose, update, saving }: Props) => {
  const { onSubmit, onSearchBusiness } = useAddBusiness({
    update,
  });

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
