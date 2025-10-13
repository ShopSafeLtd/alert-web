import type { CustomGalleryData } from 'types/DataType';

import React from 'react';

import View from './AddCustomGallery.view';
import useAddCustomGallery from './useAddCustomGallery';

interface Props {
  onClose: () => void;
  saving?: boolean;
  update: (value: CustomGalleryData) => void;
}

const AddCustomGallery = ({ onClose, saving, update }: Props): JSX.Element => {
  const { onSubmit } = useAddCustomGallery({
    update,
  });

  return (
    <View onClose={onClose} onSubmit={onSubmit} saving={saving || false} />
  );
};

export default AddCustomGallery;
