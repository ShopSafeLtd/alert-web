import React from 'react';
import { MutationUpdaterFn } from '@apollo/client';
import { CreateTagMutation } from 'graphql/generated';
import View from './AddIncident.view';
import useAddIncident from './useAddIncident';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
}

const AddIncident = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, saving } = useAddIncident({
    onClose,
    update,
  });

  return <View onSubmit={onSubmit} onClose={onClose} saving={saving} />;
};

export default AddIncident;
