import type { SchemeRekognitionQuery } from 'graphql/generated';
import { useSchemeRekognitionQuery } from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  loading: boolean;
  data: SchemeRekognitionQuery | undefined;
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

  return {
    loading,
    data,
  };
};

export default useDashboard;
