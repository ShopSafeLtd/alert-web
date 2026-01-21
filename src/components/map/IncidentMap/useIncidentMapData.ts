import type { ListIncidentsForMapQuery } from 'graphql/incidents/queries/__generated__/incident-map.generated';
import type { IncidentWhereInput } from 'graphql/types';

import { useListIncidentsForMapQuery } from 'graphql/incidents/queries/__generated__/incident-map.generated';
import { useCallback, useMemo } from 'react';

export interface UseIncidentMapDataProps {
  crimeGroupId?: string;
  investigationId?: string;
  offenderId?: string;
  skip?: boolean;
}

export type MapCardMarker = {
  geoLat?: null | number;
  geoLng?: null | number;
} & NonNullable<ListIncidentsForMapQuery['incidents']>[number];

export interface UseIncidentMapDataReturn {
  error?: Error;
  incidents: MapCardMarker[];
  loading: boolean;
  refetch: () => void;
  totalCount: number;
}

export const useIncidentMapData = ({
  crimeGroupId,
  investigationId,
  offenderId,
  skip = false,
}: UseIncidentMapDataProps): UseIncidentMapDataReturn => {
  // Build query variables
  const queryVariables = useMemo(() => {
    // Build where clause based on entity ID
    const where: IncidentWhereInput = {};

    if (investigationId) {
      where.investigations = { some: { id: { equals: investigationId } } };
    }

    if (offenderId) {
      where.offenders = { some: { id: { equals: offenderId } } };
    }

    if (crimeGroupId) {
      where.offenders = {
        some: { crimeGroups: { some: { id: { equals: crimeGroupId } } } },
      };
    }

    return {
      where,
    };
  }, [crimeGroupId, investigationId, offenderId]);

  // Determine if we should skip the query
  const shouldSkip = skip || (!crimeGroupId && !investigationId && !offenderId);

  // Execute query
  const { data, error, loading, refetch } = useListIncidentsForMapQuery({
    fetchPolicy: 'cache-and-network',
    skip: shouldSkip,
    variables: queryVariables,
  });

  // Transform incidents to include geoLat/geoLng at top level for MapCard
  const incidents = useMemo(() => {
    const rawIncidents = data?.incidents || [];

    // Filter out incidents without valid location data and flatten geoLat/geoLng
    return rawIncidents
      .filter(
        (incident) =>
          incident.location?.geoLat !== null &&
          incident.location?.geoLng !== null
      )
      .map((incident) => ({
        ...incident,
        geoLat: incident.location?.geoLat,
        geoLng: incident.location?.geoLng,
      }));
  }, [data?.incidents]);

  const handleRefetch = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    error: error ? new Error(error.message) : undefined,
    incidents,
    loading,
    refetch: handleRefetch,
    totalCount: incidents.length,
  };
};
