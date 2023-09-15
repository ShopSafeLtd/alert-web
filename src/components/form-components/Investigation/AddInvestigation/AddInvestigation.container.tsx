import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateInvestigationMutation } from 'graphql/generated';
import React from 'react';
import View from './AddInvestigation.view';
import useAddInvestigation from './useAddInvestigation';

interface Props {
  onClose: () => void;
  incidentId?: string | null;
  offenderId?: string | null;
  vehicleId?: string | null;
  crimeGroupId?: string | null;
  update?: MutationUpdaterFn<CreateInvestigationMutation>;
}

const AddInvestigation = ({
  onClose,
  update,
  offenderId,
  incidentId,
  vehicleId,
  crimeGroupId,
}: Props): JSX.Element => {
  const { onSubmit, saving } = useAddInvestigation({
    onClose,
    update,
    offenderId,
    incidentId,
    vehicleId,
    crimeGroupId,
  });

  return <View onSubmit={onSubmit} onClose={onClose} saving={saving} />;
};

export default AddInvestigation;
