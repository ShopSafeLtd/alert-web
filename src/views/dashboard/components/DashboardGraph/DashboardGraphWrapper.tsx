import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';

import React from 'react';

import DashboardGraphContainer from './DashboardGraph.container';

interface DashboardGraphWrapperProps {
  elementId?: string;
  gridHeight?: number;
  metadata?: DashboardGraphMetadata;
}

// This is a wrapper for the dashboard view that uses DashboardGraphTemplate
// but without edit capabilities (read-only mode)
const DashboardGraphWrapper = ({
  gridHeight,
  metadata,
}: DashboardGraphWrapperProps) => (
  // Always use DashboardGraphContainer, passing metadata if available
  // The container will handle both cases
  <DashboardGraphContainer gridHeight={gridHeight} metadata={metadata} />
);
export default DashboardGraphWrapper;
