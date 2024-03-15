import { useTargetedGoodsDashboardQuery } from 'graphql/generated';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useEffect, useMemo, useState } from 'react';

interface Return {
  data: { label: string; value: number }[];
  loading: boolean;
}

const useTargetedGoods = (): Return => {
  const {
    variables: { groups: groupsFilter, gallery, createdAt: createdAtFilter },
  } = useDashboardContext();
  const thirtyDaysAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    date.setUTCHours(0, 0, 0, 999);
    return date;
  }, []);
  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);
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
  const { data: queryData, loading } = useTargetedGoodsDashboardQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        dateRange,
        following: gallery.includes('FOLLOWING'),
        myData: gallery.includes('MYDATA'),
        groupIds: groupsFilter.length > 0 ? groupsFilter : undefined,
      },
    },
  });

  const data = queryData?.targetedGoodsDashboard ?? [];

  return {
    data,
    loading,
  };
};
export default useTargetedGoods;
