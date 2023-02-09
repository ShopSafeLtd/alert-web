import {
  PerformanceReportQuery,
  usePerformanceReportQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  loading: boolean;
  data: PerformanceReportQuery | undefined;
}

const usePerformanceReport = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = usePerformanceReportQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  return {
    data,
    loading,
  };
};

export default usePerformanceReport;
