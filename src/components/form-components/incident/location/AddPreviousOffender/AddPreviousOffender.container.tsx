import React from 'react';

import View from './AddExisitingOffender.view';
import useViewOffender from './useAddPreviousOffender';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
}
const ViewOffender = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, saving, data, loading } = useViewOffender({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      data={data}
      loading={loading}
    />
  );
};

export default ViewOffender;
