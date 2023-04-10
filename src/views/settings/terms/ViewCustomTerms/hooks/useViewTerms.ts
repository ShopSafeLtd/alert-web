import { useNavigate } from 'react-router';
import type { ReturnProps } from '../types/ViewCustomTerms';
import { useStoreState } from '../../../../../state';
import {
  Role,
  useCurrentSchemeTermsQuery,
} from '../../../../../graphql/generated';

const useViewTerms = (): ReturnProps => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const navigate = useNavigate();
  const isAdmin = useStoreState((state) => state.user.role !== Role.User);
  const { data, loading } = useCurrentSchemeTermsQuery({
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  const editTerms = () => {
    navigate(`/app/scheme-settings/terms/scheme/create`);
  };
  return {
    data,
    loading,
    isAdmin,
    editTerms,
  };
};

export default useViewTerms;
