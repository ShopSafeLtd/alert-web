import React, { memo } from 'react';
import View from './AddLogo.view';
import useAddLogo from './useAddLogo';

interface Props {
  onClose: () => void;
  logos: string[];
  onSubmit: (url: string) => void;
}

const AddLogo = memo(({ onClose, logos, onSubmit }: Props) => {
  const { onFinish, saving, documentUploadProps } = useAddLogo({
    onClose,
    onSubmit,
  });

  return (
    <View
      documentUploadProps={documentUploadProps}
      onSubmit={onFinish}
      onClose={onClose}
      saving={saving}
      selectLogo={onSubmit}
      logos={logos}
    />
  );
});

export default AddLogo;
