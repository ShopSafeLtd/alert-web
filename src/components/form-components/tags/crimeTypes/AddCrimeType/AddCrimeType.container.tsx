import React from 'react';
import { MutationUpdaterFn } from '@apollo/client';
import { CreateTagMutation } from 'graphql/generated';
import View from './AddCrimeType.view';
import useAddCrimeType from './useAddCrimeType';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
}

const AddCrimeType = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, saving } = useAddCrimeType({
    onClose,
    update,
  });

  return <View onSubmit={onSubmit} onClose={onClose} saving={saving} />;
};

export default AddCrimeType;
