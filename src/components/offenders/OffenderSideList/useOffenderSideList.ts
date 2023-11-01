import type { OffenderFeedListQuery } from 'graphql/generated';
import { SortOrder, useOffenderFeedListQuery } from 'graphql/generated';
import { OffenderSort, useStoreState } from 'state';

interface Return {
  data: OffenderFeedListQuery | undefined;
  loading: boolean;
  fetchMoreScroll: () => void;
}

const useOffenderSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.offenders.order);
  // const pagination = useStoreState((state) => state.data.offenders.pagination);
  // const variables = useStoreState((state) => state.data.offenders.variables);
  // const setOffendersState = useStoreActions(
  //   (actions) => actions.data.setOffenders
  // );

  const role = useStoreState((state) => state.user.role);

  const { data, loading, fetchMore } = useOffenderFeedListQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      where: {
        approved:
          role === 'USER'
            ? {
                equals: true,
              }
            : undefined,
      },
      order: {
        updatedAt:
          order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      take: 12,
      skip: 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        scheme: {
          id: schemeId,
        },
        where: {
          approved:
            role === 'USER'
              ? {
                  equals: true,
                }
              : undefined,
        },
        order: {
          updatedAt:
            order === OffenderSort.updatedAtDesc
              ? SortOrder.Desc
              : SortOrder.Asc,
        },
        take: 12,
        skip: data?.listOffenders?.offenders?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listOffenders: {
            ...fetchMoreResult.listOffenders,
            total:
              fetchMoreResult.listOffenders?.total ||
              prev.listOffenders?.total ||
              0,
            offenders: [
              ...(prev.listOffenders?.offenders || []),
              ...(fetchMoreResult.listOffenders?.offenders || []),
            ],
          },
        };
      },
    });
  };

  return {
    data,
    loading: data?.listOffenders ? false : loading,
    fetchMoreScroll,
  };
};

export default useOffenderSideList;
