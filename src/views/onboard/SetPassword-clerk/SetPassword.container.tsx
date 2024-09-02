import React from 'react';

import View from './SetPassword.view';
import useSetPassword from './useSetPassword';

const SetPassword = (): JSX.Element => {
  const { form: form, hasPassword, onSubmit, saving } = useSetPassword();
  return (
    <View
      form={form}
      hasPassword={hasPassword}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default SetPassword;
