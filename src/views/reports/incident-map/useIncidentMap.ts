import { useStoreState } from 'state';
import type { IncidentMapQuery, SchemeGroupsQuery } from 'graphql/generated';
import { useIncidentMapQuery, useSchemeGroupsQuery } from 'graphql/generated';

interface Return {
  data: IncidentMapQuery | undefined;
  loading: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
}

const useIncidentMap = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data, loading } = useIncidentMapQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  });

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  });

  return {
    data,
    loading,
    groupsData,
    groupsLoading,
  };
};

export default useIncidentMap;
