import React from 'react';
import View from './EditBrand.view';
import useEditOffenderWarning from './useEditBrand';

interface Props {
  onClose: () => void;
  brandId: string;
}

const EditOffenderWarning = ({ onClose, brandId }: Props): JSX.Element => {
  const {
    onSubmit,
    data,
    loading,
    saving,
    form,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
    onSearchBusiness,
  } = useEditOffenderWarning({
    onClose,
    brandId,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      saving={saving}
      form={form}
      addBusinessVisible={addBusinessVisible}
      toggleAddBusinessVisible={toggleAddBusinessVisible}
      updateNewBusinessData={updateNewBusinessData}
      onSearchBusiness={onSearchBusiness}
    />
  );
};

export default EditOffenderWarning;
