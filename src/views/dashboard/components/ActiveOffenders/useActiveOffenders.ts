import type { ListOffendersFeedQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListOffendersFeedQuery,
} from 'graphql/generated';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';

interface Return {
  recentOffenderData: ListOffendersFeedQuery | undefined;
  recentOffenderLoading: boolean;
}
const useActiveOffenders = (): Return => {
  const {
    variables: { search, gallery, createdAt: createdAtFilter },
    schemeId,
    userId,
  } = useDashboardContext();

  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersFeedQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt: SortOrder.Desc,
        },
        take: 10,
        where: {
          createdAt: createdAtFilter
            ? {
                gte: createdAtFilter.startDate,
                lte: createdAtFilter.endDate,
              }
            : undefined,
          approved: gallery.includes('NOT APPROVED')
            ? {
                equals: false,
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
          createdBy: gallery.includes('MYDATA')
            ? {
                id: {
                  equals: userId,
                },
              }
            : undefined,
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
        },
      },
    });
  return {
    recentOffenderData,
    recentOffenderLoading,
  };
};

export default useActiveOffenders;
