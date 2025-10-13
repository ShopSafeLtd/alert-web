import React, { memo } from 'react';

import View from './SaveAs.view';
import useSaveAs from './useSaveAs';

interface Props {
  onClose: () => void;
  onSubmit: (arg0: string, method: 'create' | 'update') => void;
}

const SaveAs = memo(({ onClose, onSubmit }: Props) => {
  const { onFinish, saving } = useSaveAs({ onClose, onSubmit });

  return <View onClose={onClose} onSubmit={onFinish} saving={saving} />;
});

export default SaveAs;
