import React from 'react';

import View from './LinkIncident.view';
import useLinkDem from './useLinkDem';

interface Props {
  businessId: string;
  onClose: () => void;
}
const LinkDem = ({ businessId, onClose }: Props): JSX.Element => {
  const { data, loading, onSelect, onSubmit, saving } = useLinkDem({
    businessId,
    onClose,
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
