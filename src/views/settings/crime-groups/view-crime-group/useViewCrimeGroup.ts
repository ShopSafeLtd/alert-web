import { CrimeGroupQuery, useCrimeGroupQuery } from 'graphql/generated';
import { useParams } from 'react-router';

interface Return {
  data: CrimeGroupQuery | undefined;
}

const useViewCrimeGroup = (): Return => {
  const params = useParams();

  const { data } = useCrimeGroupQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: params.id,
      },
    },
  });

  return {
    data,
  };
};

export default useViewCrimeGroup;
