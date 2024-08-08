import type { BusinessesSideListQuery } from '#/components/businesses/BusinessSideList/graphql/queries/sidelist.generated';

import { useBusinessesSideListQuery } from '#/components/businesses/BusinessSideList/graphql/queries/sidelist.generated';
import { SortOrder } from 'graphql/types';
import { useStoreState } from 'state';

interface Return {
  data:
    | Exclude<BusinessesSideListQuery['businessRelay'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const useBusinessSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, fetchMore, loading } = useBusinessesSideListQuery({
    variables: {
      first: 24,
      orderBy: { name: SortOrder.Asc },
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  const next = () => {
    void fetchMore({
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
      variables: {
        after: data?.businessRelay.pageInfo.endCursor,
        first: 24,
        orderBy: { name: SortOrder.Asc },
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
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
