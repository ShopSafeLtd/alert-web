import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { subMonths } from 'date-fns';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';

import { useSharedIncidentHeatmapQuery } from '../graphql/queries/__generated__/shared-incident-heatmap.generated';

export type DateRange = {
  endDate: Date;
  startDate: Date;
} | null;

const usePoliceHeatmap = () => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  // Filter state
  const [dateRange, setDateRange] = useState<DateRange>({
    endDate: new Date(),
    startDate: subMonths(new Date(), 3),
  });
  const [showFilters, setShowFilters] = useState(true);

  // Query variables
  const variables = useMemo(() => {
    interface WhereInput {
      incidentDateAfter?: string;
      incidentDateBefore?: string;
      schemeIds?: string[];
    }

    const where: WhereInput = {};

    if (schemeId) {
      where.schemeIds = [schemeId];
    }

    if (dateRange) {
      // Set start of day for start date
      const startDate = new Date(dateRange.startDate);
      startDate.setHours(0, 0, 0, 0);

      // Set end of day for end date
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999);

      where.incidentDateAfter = startDate.toISOString();
      where.incidentDateBefore = endDate.toISOString();
    }

    return { where };
  }, [schemeId, dateRange]);

  // GraphQL query
  const { data, error, loading } = useSharedIncidentHeatmapQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // Transform to GeoJSON
  const geojsonData = useMemo(
    () => ({
      features: (data?.sharedIncidentHeatmap.points || [])
        .filter((point) => point.lat !== 0 && point.lng !== 0) // Filter invalid coords
        .map((point) => ({
          geometry: {
            coordinates: [point.lng, point.lat],
            type: 'Point' as const,
          },
          properties: {
            createdAt: point.createdAt,
            id: point.id,
            priority: point.policePriorityScore ?? 0,
          },
          type: 'Feature' as const,
        })),
      type: 'FeatureCollection' as const,
    }),
    [data]
  );

  const totalCount = data?.sharedIncidentHeatmap.total ?? 0;

  return {
    dateRange,
    error,
    geojsonData,
    loading,
    onChangeDateRange: setDateRange,
    setShowFilters,
    showFilters,
    totalCount,
  };
};

export default usePoliceHeatmap;
