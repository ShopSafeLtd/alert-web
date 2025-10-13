import React from 'react';

import View from './LinkIncident.view';
import useLinkDem from './useLinkDem';

interface Props {
  onClose: () => void;
  selectEvidence: (evidence: { url: string }) => void;
}
const LinkDem = ({ onClose, selectEvidence }: Props): JSX.Element => {
  const { data, loading, onSelect, onSubmit, saving } = useLinkDem({
    onClose,
    selectEvidence,
  });

  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onSelect={onSelect}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default LinkDem;
