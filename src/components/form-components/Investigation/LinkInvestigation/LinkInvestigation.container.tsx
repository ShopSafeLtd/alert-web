import type { InvestigationData } from '#/types/DataType';

import React from 'react';

import View from './LinkInvestigation.view';
import useLinkInvestigation from './useLinkInvestigation';

interface Props {
  investigationIds?: string[];
  onClose: () => void;
  update: (value: InvestigationData) => void;
}
const LinkInvestigation = ({
  investigationIds,
  onClose,
  update,
}: Props): JSX.Element => {
  const { data, loading, onPaginationChange, onSelect, onSubmit, saving } =
    useLinkInvestigation({
      investigationIds,
      onClose,
      update,
    });

  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      onSelect={onSelect}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default LinkInvestigation;
