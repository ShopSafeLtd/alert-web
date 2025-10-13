import React from 'react';

import View from './LinkIncident.view';
import useLinkDem from './useLinkDem';

interface Props {
  businessId: string;
  onClose: () => void;
  userId: string;
}
const LinkDem = ({ businessId, onClose, userId }: Props): JSX.Element => {
  const { data, loading, onSelect, onSubmit, saving } = useLinkDem({
    businessId,
    onClose,
    userId,
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
