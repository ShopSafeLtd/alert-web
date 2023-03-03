import React from 'react';
import View from './SelectImage.view';
import useSelectImage from './useSelectImage';

interface Props {
  onClose: () => void;
  onSelect: (value: string) => void;
  investigationId: string;
}
const LinkIncident = ({
  onClose,
  onSelect,
  investigationId,
}: Props): JSX.Element => {
  const { data, loading, onSubmit } = useSelectImage({
    onClose,
    onSelect,
    investigationId,
  });

  return (
    <View onSubmit={onSubmit} data={data} onClose={onClose} loading={loading} />
  );
};

export default LinkIncident;
