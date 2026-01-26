import type { SharedOffendersFeedQuery } from '#/views/police-offenders/graphql/queries/__generated__/shared-offenders-feed.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useSharedOffendersFeedQuery } from '#/views/police-offenders/graphql/queries/__generated__/shared-offenders-feed.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';

interface Return {
  data:
    | Exclude<SharedOffendersFeedQuery['sharedOffenderRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
}

const usePoliceOffenderSideList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const variables = {
    first: 12,
    orderBy: {
      policePriorityScore: SortOrder.Desc,
    },
    where: {
      schemeIds: [schemeId],
    },
  };

  const { data, fetchMore, loading } = useSharedOffendersFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          sharedOffenderRelay: {
            ...fetchMoreResult.sharedOffenderRelay,
            edges: [
              ...(prev.sharedOffenderRelay?.edges || []),
              ...(fetchMoreResult.sharedOffenderRelay?.edges || []),
            ],
          },
        };
      },
      variables: {
        ...variables,
        after: data?.sharedOffenderRelay?.pageInfo?.endCursor,
      },
    });
  };

  return {
    data: data?.sharedOffenderRelay,
    fetchMoreScroll,
    loading: data?.sharedOffenderRelay ? false : loading,
  };
};

export default usePoliceOffenderSideList;
