import {
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { StoreColleagueDashboardSection } from 'graphql/types';
import { useAtomValue } from 'jotai';

import { useStoreColleagueDashboardQuery } from '../graphql/queries/__generated__/store-colleague-dashboard.generated';

export const useStoreColleagueDashboard = (selectedBusinessId?: string) => {
  const defaultBusinessId = useAtomValue(currentSchemeBusinessesAtom)?.at(
    0
  )?.id;
  const businessId = selectedBusinessId ?? defaultBusinessId;
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const { data, error, loading, refetch } = useStoreColleagueDashboardQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 300_000,
    skip: !businessId,
    variables: {
      businessId: businessId ?? '',
      schemeId,
      // OFFENDER_WATCHLIST + WATCHLIST_INSIGHTS share one DB query — always request together
      sections: [
        StoreColleagueDashboardSection.Summary,
        StoreColleagueDashboardSection.OffenderWatchlist,
        StoreColleagueDashboardSection.WatchlistInsights,
        StoreColleagueDashboardSection.ActiveBans,
        StoreColleagueDashboardSection.RecentIncidents,
        StoreColleagueDashboardSection.CrimePatterns,
        StoreColleagueDashboardSection.LocalAreaContext,
        StoreColleagueDashboardSection.ActionItems,
      ],
    },
  });

  const dashboard = data?.storeColleagueDashboard;

  return {
    actionItems: dashboard?.actionItems ?? null,
    activeBans: dashboard?.activeBans ?? null,
    businessId,
    crimePatterns: dashboard?.crimePatterns ?? null,
    error,
    loading,
    localAreaContext: dashboard?.localAreaContext ?? null,
    offenderWatchlist: dashboard?.offenderWatchlist ?? null,
    recentIncidents: dashboard?.recentIncidents ?? null,
    refetch,
    summary: dashboard?.summary ?? null,
    watchlistInsights: dashboard?.watchlistInsights ?? null,
  };
};
