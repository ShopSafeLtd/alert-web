import React from 'react';

import View from './IncidentMap.view';
import useIncidentMap from './useIncidentMap';

const IncidentMap = () => {
  const {
    brandsData,
    brandsLoading,
    businessData,
    data,
    groupsData,
    groupsLoading,
    industriesData,
    industriesLoading,
    loading,
    onChangeBrands,
    onChangeDateRange,
    onChangeGroups,
    onChangeIncidentTypes,
    onChangeIndustries,
    onChangePoliceAreas,
    onChangeSchemes,
    schemes,
    selectedBrands,
    selectedGroups,
    selectedIncidentTypes,
    selectedIndustries,
    selectedPoliceAreas,
    selectedSchemes,
  } = useIncidentMap();

  return (
    <View
      brandsData={brandsData}
      brandsLoading={brandsLoading}
      businessData={businessData}
      data={data}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      industriesData={industriesData}
      industriesLoading={industriesLoading}
      loading={loading}
      onChangeBrands={onChangeBrands}
      onChangeDateRange={onChangeDateRange}
      onChangeGroups={onChangeGroups}
      onChangeIncidentTypes={onChangeIncidentTypes}
      onChangeIndustries={onChangeIndustries}
      onChangePoliceAreas={onChangePoliceAreas}
      onChangeSchemes={onChangeSchemes}
      schemes={schemes}
      selectedBrands={selectedBrands}
      selectedGroups={selectedGroups}
      selectedIncidentTypes={selectedIncidentTypes}
      selectedIndustries={selectedIndustries}
      selectedPoliceAreas={selectedPoliceAreas}
      selectedSchemes={selectedSchemes}
    />
  );
};

export default IncidentMap;
