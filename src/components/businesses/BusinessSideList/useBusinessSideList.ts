import type { BusinessesSideListQuery } from 'graphql/generated';
import { SortOrder, useBusinessesSideListQuery } from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data:
    | Exclude<BusinessesSideListQuery['businessRelay'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const useBusinessSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, loading, fetchMore } = useBusinessesSideListQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
      orderBy: { name: SortOrder.Asc },
      first: 24,
    },
  });

  const next = () => {
    void fetchMore({
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
        orderBy: { name: SortOrder.Asc },
        first: 24,
        after: data?.businessRelay.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          businessRelay: {
            ...fetchMoreResult.businessRelay,
            edges: [
              ...(prev.businessRelay?.edges || []),
              ...(fetchMoreResult.businessRelay?.edges || []),
            ],
          },
        };
      },
    });
  };
  return {
    data: data?.businessRelay,
    loading: data?.businessRelay ? false : loading,
    next,
  };
};

export default useBusinessSideList;
