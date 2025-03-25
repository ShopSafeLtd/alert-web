import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';

const publicOffenderDob = (): boolean =>
  useAtomValue(currentSchemeAtom)?.defaultPublicOffenderDOB ||
  hasRolePermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Offenders,
    },
  });

export default publicOffenderDob;
