import React from 'react';
import View from './LinkIncident.view';
import useLinkDem from './useLinkDem';

interface Props {
  onClose: () => void;
  selectEvidence: (evidence: { url: string }) => void;
}
const LinkDem = ({ onClose, selectEvidence }: Props): JSX.Element => {
  const { onSubmit, saving, data, loading, onSelect } = useLinkDem({
    onClose,
    selectEvidence,
  });

  return (
    <View
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      loading={loading}
      onClose={onClose}
      onSelect={onSelect}
    />
  );
};

export default LinkDem;
