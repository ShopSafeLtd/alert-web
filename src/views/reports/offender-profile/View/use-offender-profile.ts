import { useParams } from 'react-router-dom';
import type { OffenderProfileQuery } from 'graphql/generated';
import { useOffenderProfileQuery } from 'graphql/generated';

interface Return {
  offenderProfileData: OffenderProfileQuery | undefined;
  offenderProfileLoading: boolean;
  selectedOffender: string | undefined;
}

const useOffenderProfile = (): Return => {
  const { id: selectedOffender } = useParams();

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
  };
};

export default useOffenderProfile;
