import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';

import React from 'react';

import View from './AddInvestigation.view';
import useAddInvestigation from './useAddInvestigation';

interface Props {
  crimeGroupId?: null | string;
  incidentId?: null | string;
  offenderId?: null | string;
  onClose: () => void;
  update?: MutationUpdaterFn<CreateInvestigationMutation>;
  vehicleId?: null | string;
}

const AddInvestigation = ({
  crimeGroupId,
  incidentId,
  offenderId,
  onClose,
  update,
  vehicleId,
}: Props): JSX.Element => {
  const { onSubmit, saving } = useAddInvestigation({
    crimeGroupId,
    incidentId,
    offenderId,
    onClose,
    update,
    vehicleId,
  });

  return <View onClose={onClose} onSubmit={onSubmit} saving={saving} />;
};

export default AddInvestigation;
