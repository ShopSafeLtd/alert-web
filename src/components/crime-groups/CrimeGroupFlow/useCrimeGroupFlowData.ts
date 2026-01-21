import type { ApolloError } from '@apollo/client';
import type { CrimeGroupAnalyticsQuery } from 'graphql/crime-groups/queries/__generated__/crime-group-analytics.generated';
import type { CrimeGroupFlowDataQuery } from 'graphql/crime-groups/queries/__generated__/crime-group-flow-data.generated';
import type { OffendersBasicInfoQuery } from 'graphql/offenders/queries/__generated__/offenders-basic-info.generated';

import { useCrimeGroupAnalyticsQuery } from 'graphql/crime-groups/queries/__generated__/crime-group-analytics.generated';
import { useCrimeGroupFlowDataQuery } from 'graphql/crime-groups/queries/__generated__/crime-group-flow-data.generated';
import { useOffendersBasicInfoQuery } from 'graphql/offenders/queries/__generated__/offenders-basic-info.generated';
import { CrimeGroupAnalyticsMode } from 'graphql/types';
import { useCallback, useMemo } from 'react';

type CrimeGroupIncidents = NonNullable<
  CrimeGroupFlowDataQuery['crimeGroup']
>['incidents'];

interface UseCrimeGroupFlowDataReturn {
  analytics: CrimeGroupAnalyticsQuery['crimeGroupAnalytics'];
  crimeGroup: {
    alias?: null | string;
    id: string;
    reference?: null | number;
  } | null;
  error?: ApolloError;
  incidents: CrimeGroupIncidents;
  loading: boolean;
  offenders: OffendersBasicInfoQuery['offenders'];
  refetch: () => void;
}

export const useCrimeGroupFlowData = (
  crimeGroupId: string,
  layoutMode: 'impact' | 'link-analysis'
): UseCrimeGroupFlowDataReturn => {
  // Determine GraphQL mode enum based on layout mode
  const analyticsMode =
    layoutMode === 'link-analysis'
      ? CrimeGroupAnalyticsMode.LinkAnalysis
      : CrimeGroupAnalyticsMode.Impact;

  // Query 1: Analytics for current mode only
  const {
    data: analyticsData,
    error: analyticsError,
    loading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useCrimeGroupAnalyticsQuery({
    fetchPolicy: 'cache-and-network',
    skip: !crimeGroupId,
    variables: {
      crimeGroupId,
      mode: analyticsMode,
    },
  });

  // Extract offender IDs from analytics
  const offenderIds = useMemo(
    () => analyticsData?.crimeGroupAnalytics.map((a) => a.offenderId) || [],
    [analyticsData]
  );

  // Query 2: Offender details
  const {
    data: offendersData,
    loading: offendersLoading,
    refetch: refetchOffenders,
  } = useOffendersBasicInfoQuery({
    fetchPolicy: 'cache-and-network',
    skip: offenderIds.length === 0,
    variables: {
      where: { id: { in: offenderIds } },
    },
  });

  // Query 3: Crime group incidents (for edges and modal)
  const {
    data: crimeGroupData,
    loading: crimeGroupLoading,
    refetch: refetchCrimeGroup,
  } = useCrimeGroupFlowDataQuery({
    fetchPolicy: 'cache-and-network',
    skip: !crimeGroupId,
    variables: {
      where: { id: crimeGroupId },
    },
  });

  const loading = analyticsLoading || offendersLoading || crimeGroupLoading;
  const error = analyticsError;

  const handleRefetch = useCallback(() => {
    void refetchAnalytics();
    void refetchOffenders();
    void refetchCrimeGroup();
  }, [refetchAnalytics, refetchOffenders, refetchCrimeGroup]);

  return {
    analytics: analyticsData?.crimeGroupAnalytics || [],
    crimeGroup: crimeGroupData?.crimeGroup ?? null,
    error,
    incidents: crimeGroupData?.crimeGroup?.incidents || [],
    loading,
    offenders: offendersData?.offenders || [],
    refetch: handleRefetch,
  };
};
