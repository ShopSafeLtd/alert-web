import type { Permissions } from '../state/user-model';
import type { PermissionMethod, PermissionModel } from '../graphql/generated';

interface PermissionMethodModal {
  model: PermissionModel;
  method: PermissionMethod | PermissionMethod[];
}

interface Permission {
  permissions?: Permissions[];
  permission: PermissionMethodModal;
}

/**
 * @param {Permissions[]} permissions - The permissions of the user
 * @param {PermissionMethodModal} permission - The permission you want to check
 * @returns {boolean} - Returns true if the user has the permission
 *  */
const hasPermission = ({ permissions, permission }: Permission): boolean => {
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

export default hasPermission;
