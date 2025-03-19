import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useNavigate } from 'react-router';

import type { ReturnProps } from '../types/ViewCustomTerms';

const useViewTerms = (): ReturnProps => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const navigate = useNavigate();
  const isAdmin = hasRolePermission({
    permission: { method: PermissionMethod.Read, model: PermissionModel.Terms },
  });
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
