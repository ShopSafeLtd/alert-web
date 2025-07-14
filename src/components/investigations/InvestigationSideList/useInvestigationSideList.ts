import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useQuery } from '@apollo/client';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import type {
  InvestigationsSideListQuery,
  InvestigationsSideListQueryVariables,
} from './graphql/queries/__generated__/investigations-sidelist.generated';

import { InvestigationsSideListDocument } from './graphql/queries/__generated__/investigations-sidelist.generated';

interface UseInvestigationSideListProps {
  searchQuery?: string;
}

const useInvestigationSideList = ({
  searchQuery,
}: UseInvestigationSideListProps) => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const variables = useMemo<InvestigationsSideListQueryVariables>(() => {
    const where: InvestigationsSideListQueryVariables['where'] = {
      schemeIds: [schemeId],
      ...(searchQuery && {
        search: searchQuery,
      }),
    };

    return {
      first: 20,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
      where,
    };
  }, [searchQuery, schemeId]);

  const { data, error, fetchMore, loading } = useQuery<
    InvestigationsSideListQuery,
    InvestigationsSideListQueryVariables
  >(InvestigationsSideListDocument, {
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const handleLoadMore = async () => {
    if (!data?.investigationRelay?.pageInfo?.hasNextPage) return;

    await fetchMore({
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          investigationRelay: {
            ...fetchMoreResult.investigationRelay,
            edges: [
              ...(previousResult.investigationRelay?.edges || []),
              ...(fetchMoreResult.investigationRelay?.edges || []),
            ],
          },
        };
      },
      variables: {
        ...variables,
        after: data.investigationRelay.pageInfo.endCursor,
      },
    });
  };

  const investigations = useMemo(
    () => data?.investigationRelay?.edges?.map((edge) => edge.node) || [],
    [data]
  );

  const hasMore = data?.investigationRelay?.pageInfo?.hasNextPage || false;
  const totalCount = data?.investigationRelay?.totalCount || 0;

  return {
    error,
    handleLoadMore,
    hasMore,
    investigations,
    loading,
    totalCount,
  };
};

export default useInvestigationSideList;
