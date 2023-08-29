import React from 'react';
import View from './SetPassword.view';
import useSetPassword from './useSetPassword';

interface Props {
  userId: string;
  onClose: () => void;
}
const SetPassword = ({ userId, onClose }: Props) => {
  const { onSubmit, saving } = useSetPassword({ userId, onClose });
  return <View onSubmit={onSubmit} saving={saving} onClose={onClose} />;
};

export default SetPassword;
