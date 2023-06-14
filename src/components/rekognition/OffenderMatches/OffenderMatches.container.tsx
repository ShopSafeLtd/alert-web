import React from 'react';
import View from './OffenderMatches.view';
import useOffenderMatches from './useOffenderMatches';

interface Props {
  offenderId: string;
}

const OffenderMatches = ({ offenderId }: Props) => {
  const { data, loading, lightBox, toggleLightBox } = useOffenderMatches({
    offenderId,
  });

  return (
    <View
      data={data}
      loading={loading}
      lightBox={lightBox}
      toggleLightBox={toggleLightBox}
    />
  );
};

export default OffenderMatches;
