import React from 'react';
import type { InvestigationDetails } from 'types/DataType';
import View from './EditInvestigation.view';
import useEditInvestigation from './useEditInvestigation';

interface Props {
  onClose: () => void;
  investigationData: InvestigationDetails;
}

const EditInvestigation = ({
  onClose,
  investigationData,
}: Props): JSX.Element => {
  const { onSubmit, saving } = useEditInvestigation({
    onClose,
    investigationData,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      investigationData={investigationData}
    />
  );
};

export default EditInvestigation;
