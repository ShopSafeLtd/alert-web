import type { ListOffendersFeedQuery } from 'graphql/feedItems/queries/__generated__/list-offenders.generated';

import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useListOffendersFeedQuery } from 'graphql/feedItems/queries/__generated__/list-offenders.generated';
import { QueryMode, SortOrder } from 'graphql/types';

interface Return {
  recentOffenderData: ListOffendersFeedQuery | undefined;
  recentOffenderLoading: boolean;
}
const useActiveOffenders = (): Return => {
  const {
    schemeId,
    userId,
    variables: { createdAt: createdAtFilter, gallery, search },
  } = useDashboardContext();

  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersFeedQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        order: {
          updatedAt: SortOrder.Desc,
        },
        scheme: {
          id: schemeId,
        },
        take: 10,
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              ref: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
          ],
          approved: gallery.includes('NOT APPROVED')
            ? {
                equals: false,
              }
            : undefined,
          createdAt: createdAtFilter
            ? {
                gte: createdAtFilter.startDate,
                lte: createdAtFilter.endDate,
              }
            : undefined,
          createdBy: gallery.includes('MYDATA')
            ? {
                id: {
                  equals: userId,
                },
              }
            : undefined,
          subscribedUsers: gallery.includes('FOLLOWING')
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
        },
      },
    });
  return {
    recentOffenderData,
    recentOffenderLoading,
  };
};

export default useActiveOffenders;
