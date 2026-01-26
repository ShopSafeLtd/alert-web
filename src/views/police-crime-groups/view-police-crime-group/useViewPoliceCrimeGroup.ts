import { useParams } from 'react-router-dom';

import type { GetSharedCrimeGroupQuery } from '../graphql/queries/__generated__/get-shared-crime-group.generated';

import { useGetSharedCrimeGroupQuery } from '../graphql/queries/__generated__/get-shared-crime-group.generated';

interface Return {
  crimeGroupId: string;
  data: GetSharedCrimeGroupQuery | undefined;
  error: Error | undefined;
  loading: boolean;
}

const useViewPoliceCrimeGroup = (): Return => {
  const { id } = useParams<{ id: string }>();
  const crimeGroupId = id || '';

  const { data, error, loading } = useGetSharedCrimeGroupQuery({
    fetchPolicy: 'cache-and-network',
    skip: !crimeGroupId,
    variables: {
      id: crimeGroupId,
    },
  });

  return {
    crimeGroupId,
    data,
    error: error as Error | undefined,
    loading,
  };
};

export default useViewPoliceCrimeGroup;
