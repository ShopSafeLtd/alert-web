import React from 'react';
import View from './SetPassword.view';
import useSetPassword from './useSetPassword';

const SetPassword = (): JSX.Element => {
  const { onSubmit, saving, hasPassword, form: form } = useSetPassword();
  return (
    <View
      onSubmit={onSubmit}
      saving={saving}
      hasPassword={hasPassword}
      form={form}
    />
  );
};

export default SetPassword;
