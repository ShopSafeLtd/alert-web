import React from 'react';

import View from './SelectImage.view';
import useSelectImage from './useSelectImage';

interface Props {
  investigationId: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}
const LinkIncident = ({
  investigationId,
  onClose,
  onSelect,
}: Props): JSX.Element => {
  const { data, loading, onSubmit } = useSelectImage({
    investigationId,
    onClose,
    onSelect,
  });

  return (
    <View data={data} loading={loading} onClose={onClose} onSubmit={onSubmit} />
  );
};

export default LinkIncident;
