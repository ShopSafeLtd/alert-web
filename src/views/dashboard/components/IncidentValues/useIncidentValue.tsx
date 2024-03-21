import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useTotalLossQuery } from 'graphql/generated';
import { useEffect, useMemo, useState } from 'react';

const useIncidentValue = (): {
  data: number;
  loading: boolean;
} => {
  const {
    variables: { groups: groupsFilter, gallery, createdAt: createdAtFilter },
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
        myData: gallery.includes('MYDATA'),
        groupIds: groupsFilter.length > 0 ? groupsFilter : undefined,
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
