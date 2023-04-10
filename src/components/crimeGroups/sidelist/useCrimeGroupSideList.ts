import type { ListCrimeGroupsQuery } from 'graphql/generated';
import { SortOrder, useListCrimeGroupsQuery } from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
}

const useCrimeGroupSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
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

  return {
    data,
    loading: data?.listCrimeGroups ? false : loading,
  };
};

export default useCrimeGroupSideList;
