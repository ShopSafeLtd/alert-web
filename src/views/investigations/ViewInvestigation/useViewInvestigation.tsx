import {
  useViewInvestigationQuery,
  ViewInvestigationQuery,
} from 'graphql/generated';

interface Return {
  data: ViewInvestigationQuery | undefined;
  loading: boolean;
}
const useViewInvestigation = (investigationId: string): Return => {
  const { data, loading } = useViewInvestigationQuery({
    variables: {
      where: {
        id: investigationId,
      },
    },
  });

  return {
    data,
    loading,
  };
};

export default useViewInvestigation;
