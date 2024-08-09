import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useLatestIncidentQuery } from '#/views/dashboard/graphql/queries/__generated__/latest-incident.generated';
import { useEffect, useMemo, useState } from 'react';

const useLatestIncident = (): {
  data: {
    date: Date;
    id: string;
  } | null;
  loading: boolean;
} => {
  const {
    variables: { createdAt: createdAtFilter, gallery, groups: groupsFilter },
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
  const {
    data: LatestData,
    loading,
    startPolling,
    stopPolling,
  } = useLatestIncidentQuery({
    pollInterval: 60 * 1000,
    variables: {
      where: {
        dateRange,
        following: gallery.includes('FOLLOWING'),
        groupIds: groupsFilter.length > 0 ? groupsFilter : undefined,
        myData: gallery.includes('MYDATA'),
      },
    },
  });
  useEffect(() => {
    startPolling(60 * 1000);

    const timeoutId = setTimeout(
      () => {
        stopPolling();
      },
      10 * 60 * 1000
    );

    // Clean up function to stop polling when the component unmounts or after 10 minutes
    return () => {
      clearTimeout(timeoutId); // Clear the timeout to prevent stopping polling after 10 minutes
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  const data = LatestData?.latestIncident
    ? {
        date: LatestData.latestIncident?.date,
        id: LatestData.latestIncident?.id,
      }
    : null;

  return {
    data,
    loading,
  };
};

export default useLatestIncident;
