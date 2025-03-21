import type { SchemeRekognitionQuery } from 'graphql/rekognition/queries/__generated__/scheme-rekognition.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useSchemeRekognitionQuery } from 'graphql/rekognition/queries/__generated__/scheme-rekognition.generated';
import { useAtomValue } from 'jotai/index';

interface Return {
  data: SchemeRekognitionQuery | undefined;
  loading: boolean;
}

const useDashboard = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);

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
