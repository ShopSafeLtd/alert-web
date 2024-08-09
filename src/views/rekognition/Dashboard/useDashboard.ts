import type { SchemeRekognitionQuery } from 'graphql/rekognition/queries/__generated__/scheme-rekognition.generated';

import { useSchemeRekognitionQuery } from 'graphql/rekognition/queries/__generated__/scheme-rekognition.generated';
import { useStoreState } from 'state';

interface Return {
  data: SchemeRekognitionQuery | undefined;
  loading: boolean;
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
    data,
    loading,
  };
};

export default useDashboard;
