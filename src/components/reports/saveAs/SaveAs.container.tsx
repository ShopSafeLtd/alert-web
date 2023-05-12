import React, { memo } from 'react';
import View from './SaveAs.view';
import useSaveAs from './useSaveAs';

interface Props {
  onClose: () => void;
  onSubmit: (arg0: string, method: 'update' | 'create') => void;
}

const SaveAs = memo(({ onClose, onSubmit }: Props) => {
  const { onFinish, saving } = useSaveAs({ onClose, onSubmit });

  return <View onSubmit={onFinish} onClose={onClose} saving={saving} />;
});

export default SaveAs;
