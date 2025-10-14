import type { InvestigationDetails } from 'types/DataType';

import React from 'react';

import View from './EditInvestigation.view';
import useEditInvestigation from './useEditInvestigation';

interface Props {
  investigationData: InvestigationDetails;
  onClose: () => void;
}

const EditInvestigation = ({
  investigationData,
  onClose,
}: Props): JSX.Element => {
  const { onSubmit, saving } = useEditInvestigation({
    investigationData,
    onClose,
  });

  return (
    <View
      investigationData={investigationData}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default EditInvestigation;
