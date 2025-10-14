import React from 'react';

import View from './SetPassword.view';
import useSetPassword from './useSetPassword';

interface Props {
  onClose: () => void;
  userId: string;
}
const SetPassword = ({ onClose, userId }: Props) => {
  const { onSubmit, saving } = useSetPassword({ onClose, userId });
  return <View onClose={onClose} onSubmit={onSubmit} saving={saving} />;
};

export default SetPassword;
