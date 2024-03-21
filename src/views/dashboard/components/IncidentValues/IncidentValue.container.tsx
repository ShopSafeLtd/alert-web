import React from 'react';
import View from './IncidentValue.view';
import useIncidentValue from './useIncidentValue';

const IncidentValueContainer = () => {
  const { data, loading } = useIncidentValue();
  return <View data={data} loading={loading} />;
};

export default IncidentValueContainer;
