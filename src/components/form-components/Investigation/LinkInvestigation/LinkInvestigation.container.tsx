import React from 'react';

import View from './LinkInvestigation.view';
import useLinkInvestigation from './useLinkInvestigation';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
}
const LinkInvestigation = ({ onClose, update }: Props): JSX.Element => {
  const { data, loading, onPaginationChange, onSelect, onSubmit, saving } =
    useLinkInvestigation({
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
