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
    onChangeBrands,
    onChangeIndustries,
    brandsData,
    brandsLoading,
    industriesLoading,
    selectedIndustries,
    selectedBrands,
    industriesData,
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
      onChangeBrands={onChangeBrands}
      onChangeIndustries={onChangeIndustries}
      brandsData={brandsData}
      brandsLoading={brandsLoading}
      industriesLoading={industriesLoading}
      selectedIndustries={selectedIndustries}
      selectedBrands={selectedBrands}
      industriesData={industriesData}
    />
  );
};

export default IncidentMap;
