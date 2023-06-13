import React from 'react';
import View from './CreateMg11.view';
import useAddIncident from './useCreateMg11';

const CreateMg11 = (): JSX.Element => {
  const { onSubmit, saving, form } = useAddIncident();

  return <View form={form} onSubmit={onSubmit} saving={saving} />;
};

export default CreateMg11;
