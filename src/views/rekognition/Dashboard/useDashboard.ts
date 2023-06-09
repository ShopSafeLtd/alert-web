import type {
  ListRekMatchesQuery,
  SchemeRekognitionQuery,
} from 'graphql/generated';
import {
  useListRekMatchesQuery,
  useSchemeRekognitionQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  loading: boolean;
  data: SchemeRekognitionQuery | undefined;
  matchesData: ListRekMatchesQuery | undefined;
}

const useDashboard = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data, loading } = useSchemeRekognitionQuery({
    variables: {
      where: {
        id: currentScheme,
      },
    },
  });

  const { data: matchesData } = useListRekMatchesQuery({
    variables: {
      where: {
        searchedFace: {
          image: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
          },
        },
      },
    },
  });

  return {
    loading,
    data,
    matchesData,
  };
};

export default useDashboard;
