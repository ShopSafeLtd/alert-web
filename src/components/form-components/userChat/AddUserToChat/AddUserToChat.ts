import { useState } from 'react';

interface FormData {
  user: string[];
}

interface Props {
  onClose: () => void;
  addMemberUpdate: (value: FormData) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddUserToChat = ({ onClose, addMemberUpdate }: Props): Return => {
  const [saving, setSaving] = useState(false);

  const onSubmit = (value: FormData) => {
    setSaving(true);
    addMemberUpdate(value);
    setSaving(false);
    onClose();
  };

  return {
    onSubmit,
    saving,
  };
};

export default useAddUserToChat;
