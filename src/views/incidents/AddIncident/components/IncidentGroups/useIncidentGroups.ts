import { useStoreState } from 'state';
import { Role, useSchemeGroupsQuery } from '../../../../../graphql/generated';

interface Return {
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
}

const useIncidentGroups = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);

  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    groupsLoading,
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
  };
};

export default useIncidentGroups;
