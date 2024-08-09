import type { OffenderProfileQuery } from 'graphql/reports/queries/__generated__/offender-profile.generated';

import { useOffenderProfileQuery } from 'graphql/reports/queries/__generated__/offender-profile.generated';
import { useParams } from 'react-router-dom';

interface Return {
  offenderProfileData: OffenderProfileQuery | undefined;
  offenderProfileLoading: boolean;
  reportId: string | undefined;
  selectedOffender: string | undefined;
}

const useOffenderProfile = (): Return => {
  const { id: selectedOffender, reportId } = useParams();

  console.log(reportId);

  const { data: offenderProfileData, loading: offenderProfileLoading } =
    useOffenderProfileQuery({
      fetchPolicy: 'cache-and-network',
      skip: !selectedOffender,
      variables: {
        where: {
          id: selectedOffender,
        },
      },
    });

  return {
    offenderProfileData,
    offenderProfileLoading,
    reportId,
    selectedOffender,
  };
};

export default useOffenderProfile;
