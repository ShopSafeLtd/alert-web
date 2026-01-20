import React from 'react';

import PoliceHeatmapView from './PoliceHeatmap.view';
import usePoliceHeatmap from './usePoliceHeatmap';

const PoliceHeatmapContainer: React.FC = () => {
  const {
    dateRange,
    error,
    geojsonData,
    loading,
    onChangeDateRange,
    setShowFilters,
    showFilters,
    totalCount,
  } = usePoliceHeatmap();

  return (
    <PoliceHeatmapView
      dateRange={dateRange}
      error={error}
      geojsonData={geojsonData}
      loading={loading}
      onChangeDateRange={onChangeDateRange}
      setShowFilters={setShowFilters}
      showFilters={showFilters}
      totalCount={totalCount}
    />
  );
};

export default PoliceHeatmapContainer;
