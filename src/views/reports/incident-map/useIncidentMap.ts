import { useStoreState } from 'state';
import { IncidentMapQuery, useIncidentMapQuery } from 'graphql/generated';

interface Return {
  data: IncidentMapQuery | undefined;
  loading: boolean;
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

  return {
    data,
    loading,
  };
};

export default useIncidentMap;
