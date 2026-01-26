import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';

import type { BusinessesSideListQuery } from './graphql/queries/__generated__/sidelist.generated';

import { useBusinessesSideListQuery } from './graphql/queries/__generated__/sidelist.generated';

interface Return {
  data:
    | Exclude<BusinessesSideListQuery['businessRelay'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const useBusinessSideList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

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
