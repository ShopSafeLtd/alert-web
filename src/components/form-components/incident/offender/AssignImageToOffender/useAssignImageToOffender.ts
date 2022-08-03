import { useState } from 'react';

// import { Age, Gender, Race, Build } from 'graphql/generated';

interface FormData {
  selectedOffenderIds: string[];
}

interface Props {
  onClose: () => void;
  update: (value: string[] | undefined) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useViewOffender = ({ onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update(data.selectedOffenderIds);
    setSaving(false);
    onClose();
  };
  return {
    onSubmit,
    saving,
  };
};

export default useViewOffender;
