import React from 'react';

import View from './SetPassword.view';
import useSetPassword from './useSetPassword';

interface Props {
  userId: string;
}
const SetPassword = ({ userId }: Props): JSX.Element => {
  const { onSubmit, saving } = useSetPassword({ userId });
  return <View onSubmit={onSubmit} saving={saving} />;
};

export default SetPassword;
