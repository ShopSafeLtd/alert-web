import { useStoreState } from 'state';
import type { SchemeRekognitionQuery } from 'graphql/rekognition/queries/scheme-rekognition.generated';
import { useSchemeRekognitionQuery } from 'graphql/rekognition/queries/scheme-rekognition.generated';

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
