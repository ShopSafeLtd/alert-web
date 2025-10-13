import { useState } from 'react';

interface OnSubmitValues {
  name: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (arg0: string, method: 'create' | 'update') => void;
}

interface Return {
  onFinish: (values: OnSubmitValues) => void;
  saving: boolean;
}

const useSaveAs = ({ onClose, onSubmit }: Props): Return => {
  const [saving, setSaving] = useState(false);

  const onFinish = (values: OnSubmitValues) => {
    setSaving(true);
    onSubmit(values.name, 'create');
    onClose();
    setSaving(false);
  };

  return {
    onFinish,
    saving,
  };
};

export default useSaveAs;
