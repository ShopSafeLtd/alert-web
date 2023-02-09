import {
  ListCrimeGroupsQuery,
  useListCrimeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
}

const useListCrimeGroups = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
    },
  });

  return {
    data,
    loading,
  };
};

export default useListCrimeGroups;
