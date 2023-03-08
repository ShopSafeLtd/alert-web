import React from 'react';
import View from './LinkIncident.view';
import useLinkDem from './useLinkDem';

interface Props {
  onClose: () => void;
  businessId: string;
}
const LinkDem = ({ onClose, businessId }: Props): JSX.Element => {
  const { onSubmit, saving, data, loading, onSelect } = useLinkDem({
    onClose,
    businessId,
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
