import React from 'react';
import View from './IncidentMap.view';
import useIncidentMap from './useIncidentMap';

const IncidentMap = () => {
  const {
    data,
    loading,
    groupsData,
    groupsLoading,
    businessData,
    schemes,
    onChangeSchemes,
    selectedSchemes,
  } = useIncidentMap();

  return (
    <View
      data={data}
      loading={loading}
      groupsLoading={groupsLoading}
      groupsData={groupsData}
      businessData={businessData}
      schemes={schemes}
      onChangeSchemes={onChangeSchemes}
      selectedSchemes={selectedSchemes}
    />
  );
};

export default IncidentMap;
