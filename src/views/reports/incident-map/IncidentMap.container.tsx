import React from 'react';

import View from './IncidentMap.view';
import useIncidentMapWithMetadata from './hooks/useIncidentMapWithMetadata';

const IncidentMap = () => {
  const {
    allBrandsData,
    brandsData,
    brandsLoading,
    businessData,
    cluster,
    data,
    dateRange,
    groupsData,
    groupsLoading,
    heatmapIntensity,
    industriesData,
    industriesLoading,
    loading,
    multiColour,
    onChangeBrands,
    onChangeCrimeGroups,
    onChangeDateRange,
    onChangeGroups,
    onChangeIncidentTypes,
    onChangeIndustries,
    onChangeOffenders,
    onChangePoliceAreas,
    onChangeSchemes,
    // Save filters
    saveFilters,
    saving,
    schemes,
    selectedBrands,
    selectedCrimeGroups,
    selectedGroups,
    selectedIncidentTypes,
    selectedIndustries,
    selectedOffenders,
    selectedPoliceAreas,
    selectedSchemes,
    setCluster,
    setHeatmapIntensity,
    setMultiColour,
    setShowBCRP,
    setShowBusinesses,
    setShowCameras,
    setShowHeatmap,
    setShowLondonPolice,
    setShowMarkers,
    setShowPolice,
    setShowRetailParks,
    setShowUKDistricts,
    setUseBcu,
    setViewMode,
    showBCRP,
    showBusinesses,
    showCameras,
    showHeatmap,
    showLondonPolice,
    // Display settings
    showMarkers,
    showPolice,
    showRetailParks,
    showUKDistricts,

    useBcu,
    viewMode,
  } = useIncidentMapWithMetadata();

  return (
    <View
      allBrandsData={allBrandsData}
      brandsData={brandsData}
      brandsLoading={brandsLoading}
      businessData={businessData}
      cluster={cluster}
      data={data}
      dateRange={dateRange}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      heatmapIntensity={heatmapIntensity}
      industriesData={industriesData}
      industriesLoading={industriesLoading}
      loading={loading}
      multiColour={multiColour}
      onChangeBrands={onChangeBrands}
      onChangeCrimeGroups={onChangeCrimeGroups}
      onChangeDateRange={onChangeDateRange}
      onChangeGroups={onChangeGroups}
      onChangeIncidentTypes={onChangeIncidentTypes}
      onChangeIndustries={onChangeIndustries}
      onChangeOffenders={onChangeOffenders}
      onChangePoliceAreas={onChangePoliceAreas}
      onChangeSchemes={onChangeSchemes}
      // Save filters
      saveFilters={saveFilters}
      saving={saving}
      schemes={schemes}
      selectedBrands={selectedBrands}
      selectedCrimeGroups={selectedCrimeGroups}
      selectedGroups={selectedGroups}
      selectedIncidentTypes={selectedIncidentTypes}
      selectedIndustries={selectedIndustries}
      selectedOffenders={selectedOffenders}
      selectedPoliceAreas={selectedPoliceAreas}
      selectedSchemes={selectedSchemes}
      setCluster={setCluster}
      setHeatmapIntensity={setHeatmapIntensity}
      setMultiColour={setMultiColour}
      setShowBCRP={setShowBCRP}
      setShowBusinesses={setShowBusinesses}
      setShowCameras={setShowCameras}
      setShowHeatmap={setShowHeatmap}
      setShowLondonPolice={setShowLondonPolice}
      setShowMarkers={setShowMarkers}
      setShowPolice={setShowPolice}
      setShowRetailParks={setShowRetailParks}
      setShowUKDistricts={setShowUKDistricts}
      setUseBcu={setUseBcu}
      setViewMode={setViewMode}
      showBCRP={showBCRP}
      showBusinesses={showBusinesses}
      showCameras={showCameras}
      showHeatmap={showHeatmap}
      showLondonPolice={showLondonPolice}
      // Display settings
      showMarkers={showMarkers}
      showPolice={showPolice}
      showRetailParks={showRetailParks}
      showUKDistricts={showUKDistricts}
      useBcu={useBcu}
      viewMode={viewMode}
    />
  );
};

export default IncidentMap;
