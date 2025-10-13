import React from 'react';

import View from './SchemeSharing.view';
import useSchemeSharing from './useSchemeSharing';

const SchemeSharing = (): JSX.Element => {
  const { connectOpen, data, loading, onUnlink, toggleDrawerOpen } =
    useSchemeSharing();

  return (
    <View
      connectOpen={connectOpen}
      data={data}
      loading={loading}
      onUnlink={onUnlink}
      toggleDrawerOpen={toggleDrawerOpen}
    />
  );
};

export default SchemeSharing;
