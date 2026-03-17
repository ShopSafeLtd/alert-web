import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { BusinessLossPreventionSection } from 'graphql/types';
import { useAtomValue } from 'jotai';

import { useBusinessLossPreventionDashboardQuery } from './graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

export const useBusinessLossPreventionDashboard = (
  businessId: string | undefined
) => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const { data, error, loading, refetch } =
    useBusinessLossPreventionDashboardQuery({
      fetchPolicy: 'cache-and-network',
      skip: !businessId,
      variables: {
        businessId: businessId ?? '',
        schemeId,
        // OFFENDER_WATCHLIST + WATCHLIST_INSIGHTS share one DB query — always request together
        sections: [
          BusinessLossPreventionSection.Summary,
          BusinessLossPreventionSection.RiskProfile,
          BusinessLossPreventionSection.OffenderWatchlist,
          BusinessLossPreventionSection.WatchlistInsights,
          BusinessLossPreventionSection.ActiveBans,
          BusinessLossPreventionSection.RecentIncidents,
          BusinessLossPreventionSection.CrimePatterns,
          BusinessLossPreventionSection.LinkedInvestigations,
          BusinessLossPreventionSection.SchemeComparison,
          BusinessLossPreventionSection.ActionItems,
        ],
      },
    });

  const dashboard = data?.businessLossPreventionDashboard;

  return {
    actionItems: dashboard?.actionItems ?? null,
    activeBans: dashboard?.activeBans ?? null,
    crimePatterns: dashboard?.crimePatterns ?? null,
    error,
    linkedInvestigations: dashboard?.linkedInvestigations ?? null,
    loading,
    offenderWatchlist: dashboard?.offenderWatchlist ?? null,
    recentIncidents: dashboard?.recentIncidents ?? null,
    refetch,
    riskProfile: dashboard?.riskProfile ?? null,
    schemeComparison: dashboard?.schemeComparison ?? null,
    summary: dashboard?.summary ?? null,
    watchlistInsights: dashboard?.watchlistInsights ?? null,
  };
};
