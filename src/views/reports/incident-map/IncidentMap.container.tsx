import React from 'react';
import View from './IncidentMap.view';
import useIncidentMap from './useIncidentMap';

const IncidentMap = () => {
  const { data, loading } = useIncidentMap();

  return <View data={data} loading={loading} />;
};

export default IncidentMap;
