import React from 'react';

import View from './EditBrand.view';
import useEditOffenderWarning from './useEditBrand';

interface Props {
  brandId: string;
  onClose: () => void;
}

const EditOffenderWarning = ({ brandId, onClose }: Props): JSX.Element => {
  const { data, form, loading, onSubmit, saving } = useEditOffenderWarning({
    brandId,
    onClose,
  });
  return (
    <View
      data={data}
      form={form}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default EditOffenderWarning;
