import type { DateRange } from 'views/police-dashboard/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { subMonths } from 'date-fns';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';

import { useRetailAdminDashboardQuery } from '../graphql/queries/__generated__/retail-admin-dashboard.generated';

export const useRetailAdminDashboard = (dateRange?: DateRange) => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const variables = useMemo(() => {
    const vars: {
      endDate?: Date;
      schemeId?: null | string;
      startDate?: Date;
    } = { schemeId };

    if (dateRange) {
      const startDate = new Date(dateRange.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999);
      vars.startDate = startDate;
      vars.endDate = endDate;
    }

    return vars;
  }, [schemeId, dateRange]);

  const { data, error, loading, refetch } = useRetailAdminDashboardQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 300_000,
    variables,
  });

  const dashboard = data?.retailAdminDashboard;

  return {
    businessIntelligence: dashboard?.businessIntelligence ?? null,
    crimePatterns: dashboard?.crimePatterns ?? null,
    crimeTypeDistribution: dashboard?.crimeTypeDistribution ?? [],
    error,
    loading,
    operationalQueue: dashboard?.operationalQueue ?? null,
    refetch,
    repeatOffenderInsights: dashboard?.repeatOffenderInsights ?? null,
    summary: dashboard?.summary ?? null,
    targetedGoods: dashboard?.targetedGoods ?? [],
    topOffenders: dashboard?.topOffenders ?? [],
  };
};

export const useRetailAdminDashboardWithDateState = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    endDate: new Date(),
    startDate: subMonths(new Date(), 3),
  });

  const data = useRetailAdminDashboard(dateRange);

  return { ...data, dateRange, setDateRange };
};
