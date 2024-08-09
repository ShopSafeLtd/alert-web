import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useTotalLossQuery } from '#/views/dashboard/graphql/queries/__generated__/value-lost.generated';
import { useEffect, useMemo, useState } from 'react';

const useIncidentValue = (): {
  data: number;
  loading: boolean;
} => {
  const {
    variables: { createdAt: createdAtFilter, gallery, groups: groupsFilter },
  } = useDashboardContext();
  const thirtyDaysAgoMemo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    date.setUTCHours(0, 0, 0, 999);
    return date;
  }, []);
  const [thirtyDaysAgo] = useState(thirtyDaysAgoMemo);

  const endOfDay = useMemo(() => {
    const date = new Date();
    date.setUTCHours(23, 59, 59, 999);
    return date;
  }, []);
  const [dateRange, setDateRange] = useState({
    endDate: createdAtFilter?.endDate ?? endOfDay,
    startDate: createdAtFilter?.startDate ?? thirtyDaysAgo,
  });

  useEffect(() => {
    setDateRange({
      endDate: createdAtFilter?.endDate ?? endOfDay,
      startDate: createdAtFilter?.startDate ?? thirtyDaysAgo,
    });
  }, [createdAtFilter]);

  const { data: CountData, loading } = useTotalLossQuery({
    variables: {
      where: {
        dateRange,
        following: gallery.includes('FOLLOWING'),
        groupIds: groupsFilter.length > 0 ? groupsFilter : undefined,
        myData: gallery.includes('MYDATA'),
      },
    },
  });

  const data = CountData?.totalLoss ?? 0;

  return {
    data,
    loading,
  };
};

export default useIncidentValue;
