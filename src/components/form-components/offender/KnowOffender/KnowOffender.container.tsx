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
      <View onClose={onClose} onSubmit={onSubmit} saving={saving} />
    </div>
  );
};

export default KnowOffender;
