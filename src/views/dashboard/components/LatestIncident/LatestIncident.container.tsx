import React from 'react';

import View from './LatestIncident.view';
import useLatestIncident from './useLatestIncident';

const LatestIncidentContainer = () => {
  const { data, loading } = useLatestIncident();
  return <View data={data} loading={loading} />;
};

export default LatestIncidentContainer;
