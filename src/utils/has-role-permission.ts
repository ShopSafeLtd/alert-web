import type { PermissionMethod, PermissionModel } from 'graphql/types';

import { useStoreState } from '#/state';
import { useMemo } from 'react';

interface PermissionMethodModal {
  method: PermissionMethod | PermissionMethod[];
  model: PermissionModel;
}

interface Permission {
  permission: PermissionMethodModal;
}

/**
 * @param {PermissionMethodModal} permission - The permission you want to check
 * @returns {boolean} - Returns true if the user has the permission
 *  */
const hasRolePermission = ({ permission }: Permission): boolean => {
  const currentSchemeId = useStoreState((state) => state.scheme.id);
  const schemes = useStoreState((state) => state.user.schemes);
  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === currentSchemeId),
    [schemes, currentSchemeId]
  );
  const permissions = currentScheme?.permissions;

  if (!permissions) {
    return false;
  }
  const permissionModel = permissions.find(
    (perm) => perm.model === permission.model
  );

  if (!permissionModel) {
    return false;
  }

  const { allowedMethods } = permissionModel;

  if (Array.isArray(permission.method)) {
    return permission.method.some((method) => allowedMethods.includes(method));
  }
  return allowedMethods.includes(permission.method);
};

export default hasRolePermission;
