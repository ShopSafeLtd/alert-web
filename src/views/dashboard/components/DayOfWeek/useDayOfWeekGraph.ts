import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useEffect, useMemo, useState } from 'react';
import { useIncidentsDayOfWeekQuery } from '#/views/dashboard/graphql/queries/day-of-week.generated';

interface Return {
  data: { label: string; value: number }[];
  loading: boolean;
}

const useDayOfWeekGraph = (): Return => {
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
  const { data: queryData, loading } = useIncidentsDayOfWeekQuery({
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

  const data = queryData?.incidentsDayOfWeek ?? [];

  return {
    data,
    loading,
  };
};
export default useDayOfWeekGraph;
