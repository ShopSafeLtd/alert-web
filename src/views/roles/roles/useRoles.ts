import { useStoreState } from '../../../state';
import type { RolesQuery } from '#/views/roles/graphql/queries/roles.generated';
import { useRolesQuery } from '#/views/roles/graphql/queries/roles.generated';

interface Return {
  data: RolesQuery | undefined;
  loading: boolean;
  fetchPage: (page: number) => void;
}

const useRoles = (): Return => {
  const { id: currentScheme } = useStoreState((state) => state.scheme);

  const { data, loading, fetchMore } = useRolesQuery({
    variables: {
      take: 20,
      schemeId: currentScheme || '',
    },
  });

  const fetchPage = (page: number) => {
    void fetchMore({
      variables: {
        take: 20,
        schemeId: currentScheme || '',
        skip: page * 20,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          roles: {
            ...fetchMoreResult.roles,
            edges: [
              ...(prev.roles?.edges || []),
              ...(fetchMoreResult.roles?.edges || []),
            ],
          },
        };
      },
    });
  };

  return { data, loading, fetchPage };
};
export default useRoles;
