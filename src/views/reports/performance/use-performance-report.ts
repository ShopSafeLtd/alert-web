import {
  PerformanceReportQuery,
  usePerformanceReportQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data: PerformanceReportQuery | undefined;
}

const usePerformanceReport = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data } = usePerformanceReportQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  return {
    data,
  };
};

export default usePerformanceReport;
