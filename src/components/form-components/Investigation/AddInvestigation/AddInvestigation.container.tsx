import { MutationUpdaterFn } from '@apollo/client';
import { CreateInvestigationMutation } from 'graphql/generated';
import React from 'react';
import View from './AddInvestigation.view';
import useAddInvestigation from './useAddInvestigation';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateInvestigationMutation>;
}

const AddInvestigation = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, saving } = useAddInvestigation({
    onClose,
    update,
  });

  return <View onSubmit={onSubmit} onClose={onClose} saving={saving} />;
};

export default AddInvestigation;
