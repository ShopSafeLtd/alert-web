import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTagMutation, TagType } from 'graphql/generated';
import View from './AddCrimeType.view';
import useAddCrimeType from './useAddCrimeType';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
  type?: TagType;
}

const AddCrimeType = ({ onClose, update, type }: Props): JSX.Element => {
  const { onSubmit, saving } = useAddCrimeType({
    onClose,
    update,
    type,
  });

  return (
    <View onSubmit={onSubmit} onClose={onClose} saving={saving} type={type} />
  );
};

export default AddCrimeType;
