import { useStoreState } from '#/state';
import hasRolePermission from '#/utils/has-role-permission';
import { PermissionMethod, PermissionModel } from 'graphql/types';

const publicOffenderDob = (): boolean =>
  useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
  hasRolePermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Offenders,
    },
  });

export default publicOffenderDob;
