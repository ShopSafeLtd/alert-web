import React, { memo } from 'react';

import View from './AddLogo.view';
import useAddLogo from './useAddLogo';

interface Props {
  logos: string[];
  onClose: () => void;
  onSubmit: (url: string) => void;
}

const AddLogo = memo(({ logos, onClose, onSubmit }: Props) => {
  const { documentUploadProps, onFinish, saving } = useAddLogo({
    onClose,
    onSubmit,
  });

  return (
    <View
      documentUploadProps={documentUploadProps}
      logos={logos}
      onClose={onClose}
      onSubmit={onFinish}
      saving={saving}
      selectLogo={onSubmit}
    />
  );
});

export default AddLogo;
