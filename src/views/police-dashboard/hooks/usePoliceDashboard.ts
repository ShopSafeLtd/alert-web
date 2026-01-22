import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import type { DateRange } from '../types';

import {
  type PoliceHubDashboardQueryVariables,
  usePoliceHubDashboardQuery,
} from '../graphql/queries/__generated__/police-hub-dashboard.generated';

export const usePoliceDashboard = (dateRange?: DateRange) => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const variables = useMemo(() => {
    const vars: PoliceHubDashboardQueryVariables = {
      policeHubId: schemeId,
    };

    if (dateRange) {
      // Set start of day for start date
      const startDate = new Date(dateRange.startDate);
      startDate.setHours(0, 0, 0, 0);

      // Set end of day for end date
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999);

      vars.startDate = startDate;
      vars.endDate = endDate;
    }
    // If dateRange is null/undefined, don't pass dates (ALL TIME)

    return vars;
  }, [schemeId, dateRange]);

  const { data, error, loading, refetch } = usePoliceHubDashboardQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 300_000, // Refresh every 5 minutes
    variables,
  });

  return {
    activeCrimeGroups: data?.policeHubDashboard?.activeCrimeGroups || [],
    error,
    incidentTypeDistribution:
      data?.policeHubDashboard?.incidentTypeDistribution || [],
    loading,
    monthlyIncidentCounts:
      data?.policeHubDashboard?.monthlyIncidentCounts || [],
    refetch,
    repeatOffenderInsights: data?.policeHubDashboard?.repeatOffenderInsights,
    summary: data?.policeHubDashboard?.summary,
    topOffenders: data?.policeHubDashboard?.topOffenders || [],
    vehiclesOfInterest: data?.policeHubDashboard?.vehiclesOfInterest || [],
  };
};
