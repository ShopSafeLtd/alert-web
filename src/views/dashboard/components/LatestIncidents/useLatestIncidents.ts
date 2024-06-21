import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useEffect, useMemo, useState } from 'react';
import type {
  LatestIncidentsQuery,
  LatestIncidentsQueryVariables,
} from '#/views/dashboard/graphql/queries/latest-incidents.generated';
import { useLatestIncidentsQuery } from '#/views/dashboard/graphql/queries/latest-incidents.generated';

interface Return {
  data: LatestIncidentsQuery | undefined;
  loading: boolean;
  fetchMoreScroll: () => void;
}

const useLatestIncidents = (): Return => {
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
  const { where }: LatestIncidentsQueryVariables = {
    where: {
      dateRange,
      following: gallery.includes('FOLLOWING'),
      myData: gallery.includes('MYDATA'),
      groupIds: groupsFilter.length > 0 ? groupsFilter : undefined,
    },
  };

  const { data, loading, fetchMore } = useLatestIncidentsQuery({
    variables: {
      where,
      first: 18,
    },
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        where,
        after: data?.latestIncidents.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          latestIncidents: {
            ...fetchMoreResult.latestIncidents,
            edges: [
              ...(prev.latestIncidents?.edges || []),
              ...(fetchMoreResult.latestIncidents?.edges || []),
            ],
          },
        };
      },
    });
  };

  return {
    data,
    loading: (data === null || data === undefined) && loading,
    fetchMoreScroll,
  };
};

export default useLatestIncidents;
