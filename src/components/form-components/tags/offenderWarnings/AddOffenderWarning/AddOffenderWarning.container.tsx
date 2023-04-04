import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTagMutation } from 'graphql/generated';
import React from 'react';
import View from './AddOffenderWarning.view';
import useAddOffenderWarning from './useAddOffenderWarning';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
}

const AddOffenderWarning = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, saving } = useAddOffenderWarning({
    onClose,
    update,
  });

  return <View onSubmit={onSubmit} onClose={onClose} saving={saving} />;
};

export default AddOffenderWarning;
