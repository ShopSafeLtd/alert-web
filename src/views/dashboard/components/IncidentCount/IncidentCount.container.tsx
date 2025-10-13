import React from 'react';

import View from './IncidentCount.view';
import useIncidentCount from './useIncidentCount';

const IncidentCountContainer = () => {
  const { data, loading } = useIncidentCount();
  return <View data={data} loading={loading} />;
};

export default IncidentCountContainer;
