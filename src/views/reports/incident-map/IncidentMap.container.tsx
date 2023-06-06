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
    onChangeGroups,
    selectedGroups,
    onChangeDateRange,
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
      onChangeGroups={onChangeGroups}
      selectedGroups={selectedGroups}
      onChangeDateRange={onChangeDateRange}
    />
  );
};

export default IncidentMap;
