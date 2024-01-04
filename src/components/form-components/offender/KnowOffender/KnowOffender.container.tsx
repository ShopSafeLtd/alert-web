import React from 'react';
import View from './KnowOffender.view';
import useKnowOffender from './useKnowOffender';

interface Props {
  offenderId: string;
  onClose: () => void;
}

const KnowOffender = ({ offenderId, onClose }: Props): JSX.Element => {
  const { onSubmit, saving } = useKnowOffender({ offenderId, onClose });
  return (
    <div>
      <View onSubmit={onSubmit} saving={saving} onClose={onClose} />
    </div>
  );
};

export default KnowOffender;
