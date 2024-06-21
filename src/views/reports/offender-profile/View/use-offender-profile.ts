import { useParams } from 'react-router-dom';
import type { OffenderProfileQuery } from 'graphql/reports/queries/offender-profile.generated';
import { useOffenderProfileQuery } from 'graphql/reports/queries/offender-profile.generated';

interface Return {
  offenderProfileData: OffenderProfileQuery | undefined;
  offenderProfileLoading: boolean;
  selectedOffender: string | undefined;
  reportId: string | undefined;
}

const useOffenderProfile = (): Return => {
  const { id: selectedOffender, reportId } = useParams();

  console.log(reportId);

  const { data: offenderProfileData, loading: offenderProfileLoading } =
    useOffenderProfileQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          id: selectedOffender,
        },
      },
      skip: !selectedOffender,
    });

  return {
    offenderProfileData,
    offenderProfileLoading,
    selectedOffender,
    reportId,
  };
};

export default useOffenderProfile;
