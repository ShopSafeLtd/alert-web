import type { RolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useRolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';
import { useAtomValue } from 'jotai/index';

interface Return {
  data: RolesQuery | undefined;
  fetchPage: (page: number) => void;
  loading: boolean;
}

const useRoles = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const { data, fetchMore, loading } = useRolesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      schemeId: currentScheme || '',
      take: 20,
    },
  });

  const fetchPage = (page: number) => {
    void fetchMore({
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
      variables: {
        schemeId: currentScheme || '',
        skip: page * 20,
        take: 20,
      },
    });
  };

  return { data, fetchPage, loading };
};
export default useRoles;
