import React from 'react';
import View from './EditBusiness.view';
import useEditBusiness from './useEditBusiness';

interface Props {
  onClose: () => void;
  businessId: string | undefined;
}

const EditBusiness = ({ onClose, businessId }: Props) => {
  const { onSubmit, onSearchBusiness, saving, form, loading } = useEditBusiness(
    { onClose, businessId }
  );

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      onSearchBusiness={onSearchBusiness}
      saving={saving}
      form={form}
      loading={loading}
    />
  );
};

export default EditBusiness;
