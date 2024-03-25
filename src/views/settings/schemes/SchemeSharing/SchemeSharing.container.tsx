import React from 'react';
import View from './SchemeSharing.view';
import useSchemeSharing from './useSchemeSharing';

const SchemeSharing = (): JSX.Element => {
  const { data, loading } = useSchemeSharing();

  return <View data={data} loading={loading} />;
};

export default SchemeSharing;
