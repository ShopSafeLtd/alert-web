import type {
  LatestIncidentsQuery,
  LatestIncidentsQueryVariables,
} from '#/views/dashboard/graphql/queries/__generated__/latest-incidents.generated';

import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useLatestIncidentsQuery } from '#/views/dashboard/graphql/queries/__generated__/latest-incidents.generated';
import { useEffect, useMemo, useState } from 'react';

interface Return {
  data: LatestIncidentsQuery | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
}

const useDraftIncidents = (): Return => {
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
  const { where }: LatestIncidentsQueryVariables = {
    where: {
      dateRange,
      draft: true,
      following: gallery.includes('FOLLOWING'),
      groupIds: groupsFilter.length > 0 ? groupsFilter : undefined,
      myData: gallery.includes('MYDATA'),
    },
  };

  const { data, fetchMore, loading } = useLatestIncidentsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 18,
      where,
    },
  });

  const fetchMoreScroll = () => {
    void fetchMore({
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
      variables: {
        after: data?.latestIncidents.pageInfo.endCursor,
        where,
      },
    });
  };

  return {
    data,
    fetchMoreScroll,
    loading: (data === null || data === undefined) && loading,
  };
};

export default useDraftIncidents;
