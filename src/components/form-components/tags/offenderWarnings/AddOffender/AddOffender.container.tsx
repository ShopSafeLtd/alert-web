import { MutationUpdaterFn } from '@apollo/client';
import { CreateTagMutation } from 'graphql/generated';
import React from 'react';
import View from './AddOffender.view';
import useAddOffender from './useAddOffender';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
}

const AddOffender = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, saving } = useAddOffender({
    onClose,
    update,
  });

  return <View onSubmit={onSubmit} onClose={onClose} saving={saving} />;
};

export default AddOffender;
