import React from 'react';
import View from './SchemeSharing.view';
import useSchemeSharing from './useSchemeSharing';

const SchemeSharing = (): JSX.Element => {
  const { data, loading, toggleDrawerOpen, connectOpen, onUnlink } =
    useSchemeSharing();

  return (
    <View
      data={data}
      loading={loading}
      connectOpen={connectOpen}
      toggleDrawerOpen={toggleDrawerOpen}
      onUnlink={onUnlink}
    />
  );
};

export default SchemeSharing;
