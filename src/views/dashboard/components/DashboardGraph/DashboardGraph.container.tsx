import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';

import React from 'react';

import View from './DashboardGraph';
import useDashboardGraph from './useDashboardGraph';

interface DashboardGraphContainerProps {
  gridHeight?: number;
  metadata?: DashboardGraphMetadata;
}

const DashboardGraph = ({
  gridHeight,
  metadata,
}: DashboardGraphContainerProps) => {
  const { data, loading } = useDashboardGraph(metadata);
  return (
    <View
      data={data}
      gridHeight={gridHeight}
      loading={loading}
      metadata={metadata}
    />
  );
};

export default DashboardGraph;
