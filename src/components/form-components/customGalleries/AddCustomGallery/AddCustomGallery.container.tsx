import React from 'react';
import type { CustomGalleryData } from 'types/DataType';
import View from './AddCustomGallery.view';
import useAddCustomGallery from './useAddCustomGallery';

interface Props {
  onClose: () => void;
  update: (value: CustomGalleryData) => void;
  saving?: boolean;
}

const AddCustomGallery = ({ onClose, update, saving }: Props): JSX.Element => {
  const { onSubmit } = useAddCustomGallery({
    update,
  });

  return (
    <View onSubmit={onSubmit} onClose={onClose} saving={saving || false} />
  );
};

export default AddCustomGallery;
