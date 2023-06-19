import React from 'react';
import type { CustomGalleryData } from 'types/DataType';
import View from './AddCustomGallery.view';
import useAddOffenderWarning from './useAddCustomGallery';

interface Props {
  onClose: () => void;
  update: (value: CustomGalleryData) => void;
  saving?: boolean;
}

const AddOffenderWarning = ({
  onClose,
  update,
  saving,
}: Props): JSX.Element => {
  const { onSubmit } = useAddOffenderWarning({
    update,
  });

  return (
    <View onSubmit={onSubmit} onClose={onClose} saving={saving || false} />
  );
};

export default AddOffenderWarning;
