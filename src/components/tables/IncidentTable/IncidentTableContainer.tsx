import { FEATURE_FLAGS } from 'configs/featureFlags';
import React, { useMemo } from 'react';

import type { UseIncidentTableDataReturn } from './useIncidentTableData';

import IncidentTable from './IncidentTable.view';
import { IncidentTableFilters } from './IncidentTableFilters';
import { useIncidentTableData } from './useIncidentTableData';
import { useIncidentTableDataRelay } from './useIncidentTableDataRelay';

interface IncidentTableContainerProps {
  // Context filters (passed from parent) - ONE of these can be provided
  crimeGroupId?: string;
  defaultSortOrder?: 'ascend' | 'descend';
  deleteRights?: boolean;
  hasNavigation?: boolean;
  investigationId?: string;
  offenderId?: string;
  onDelete?: (id: string) => void;
  pageSize?: number;
  setEditData?: (id: string) => void;
  showFilters?: boolean;
}

export const IncidentTableContainer: React.FC<IncidentTableContainerProps> = ({
  crimeGroupId,
  defaultSortOrder = 'descend',
  deleteRights,
  hasNavigation,
  investigationId,
  offenderId,
  onDelete,
  pageSize = 10,
  setEditData,
  showFilters = true,
}) => {
  // Use Relay pagination if feature flag is enabled, otherwise use original implementation
  const useIncidentDataHook = FEATURE_FLAGS.USE_RELAY_PAGINATION_INCIDENTS
    ? useIncidentTableDataRelay
    : useIncidentTableData;

  const {
    filters,
    handleClearFilters,
    handleFiltersChange,
    handlePageChange,
    handleSortChange,
    incidents,
    loading,
    page,
    pageSize: currentPageSize,
    sortField,
    sortOrder,
    totalCount,
  }: UseIncidentTableDataReturn = useIncidentDataHook({
    crimeGroupId,
    defaultSortOrder,
    investigationId,
    offenderId,
    pageSize,
  });

  // Map incidents to the format expected by IncidentTable
  const mappedIncidents = useMemo(
    () =>
      incidents.map((incident) => {
        // Calculate total value from incidentItems
        const totalValue = incident.incidentItems.reduce(
          (sum, item) => sum + (item.value || 0),
          0
        );

        // Calculate total recovered value from incidentItems
        const totalRecoveredValue = incident.incidentItems.reduce(
          (sum, item) => sum + (item.recoveredValue || 0),
          0
        );

        return {
          business: incident.business,
          dayTime: incident.dayTime,
          id: incident.id,
          location: incident.location,
          offenders: incident.offenders.map((offender) => ({
            id: offender.id,
            // Query returns max 1 image per offender (take: 1)
            images: offender.images.length > 0 ? offender.images : null,
            name: offender.name,
            reference: null,
          })),
          policeRef: incident.policeRef,
          reference: incident.reference,
          subject: incident.subject,
          totalRecoveredValue,
          totalValue,
        };
      }),
    [incidents]
  );

  return (
    <div>
      {showFilters && (
        <IncidentTableFilters
          filters={filters}
          investigationId={investigationId}
          offenderId={offenderId}
          onClearFilters={handleClearFilters}
          onFiltersChange={handleFiltersChange}
        />
      )}

      <IncidentTable
        deleteRights={deleteRights}
        hasNavigation={hasNavigation}
        incidents={mappedIncidents}
        loading={loading}
        onDelete={onDelete}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        page={page}
        pageSize={currentPageSize}
        setEditData={setEditData}
        sortField={sortField}
        sortOrder={sortOrder}
        total={totalCount}
      />
    </div>
  );
};

export default IncidentTableContainer;
