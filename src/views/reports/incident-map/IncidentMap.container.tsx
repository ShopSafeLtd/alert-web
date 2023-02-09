import React from 'react';
import View from './IncidentMap.view';
import useIncidentMap from './useIncidentMap';

const IncidentMap = () => {
  const { data, loading, groupsData, groupsLoading } = useIncidentMap();

  return (
    <View
      data={data}
      loading={loading}
      groupsLoading={groupsLoading}
      groupsData={groupsData}
    />
  );
};

export default IncidentMap;
