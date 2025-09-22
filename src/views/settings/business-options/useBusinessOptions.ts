import { useQuery } from '@apollo/client';

import {
  BusinessQuestionsDocument,
  type BusinessQuestionsQuery,
} from './graphql/__generated__/business-questions.generated';

const useBusinessOptions = () => {
  const result = useQuery(BusinessQuestionsDocument, {
    variables: {
      first: 50,
      orderBy: {
        priority: 'asc',
      },
      where: {
        deleted: { equals: false },
      },
    },
  });

  return {
    data: result.data as BusinessQuestionsQuery | undefined,
    loading: result.loading,
    refetch: result.refetch,
  };
};

export default useBusinessOptions;
