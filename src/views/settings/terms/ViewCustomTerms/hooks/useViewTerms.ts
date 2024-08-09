import { useStoreState } from '#/state';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';
import { Role } from 'graphql/types';
import { useNavigate } from 'react-router';

import type { ReturnProps } from '../types/ViewCustomTerms';

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
    navigate('/app/scheme-settings/terms/scheme/create');
  };
  return {
    data,
    editTerms,
    isAdmin,
    loading,
  };
};

export default useViewTerms;
