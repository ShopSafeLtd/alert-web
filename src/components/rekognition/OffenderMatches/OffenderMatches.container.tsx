import React from 'react';

import View from './OffenderMatches.view';
import useOffenderMatches from './useOffenderMatches';

interface Props {
  offenderId: string;
}

const OffenderMatches = ({ offenderId }: Props) => {
  const { data, lightBox, loading, onDismissMatch, toggleLightBox } =
    useOffenderMatches({
      offenderId,
    });

  return (
    <View
      data={data}
      lightBox={lightBox}
      loading={loading}
      onDismissMatch={onDismissMatch}
      toggleLightBox={toggleLightBox}
    />
  );
};

export default OffenderMatches;
