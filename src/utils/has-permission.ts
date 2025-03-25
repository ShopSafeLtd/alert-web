import type { PermissionMethod, PermissionModel } from 'graphql/types';

interface PermissionMethodModal {
  method: PermissionMethod | PermissionMethod[];
  model: PermissionModel;
}

interface Permissions {
  allowedMethods: PermissionMethod[];
  model: PermissionModel;
}

interface Permission {
  permission: PermissionMethodModal | PermissionMethodModal[];
  permissions?: Permissions[];
}

/**
 * @param {Permissions[]} permissions - The permissions of the user
 * @param {PermissionMethodModal | PermissionMethodModal[]} permission - The permission(s) you want to check
 * @returns {boolean} - Returns true if the user has any of the provided permission(s)
 */
const hasPermission = ({ permission, permissions }: Permission): boolean => {
  if (!permissions) {
    return false;
  }

  // Function that checks a single permission object.
  const checkPermission = (permToCheck: PermissionMethodModal): boolean => {
    const permissionModel = permissions.find(
      (perm) => perm.model === permToCheck.model
    );
    if (!permissionModel) {
      return false;
    }
    const { allowedMethods } = permissionModel;
    if (Array.isArray(permToCheck.method)) {
      return permToCheck.method.some((method) =>
        allowedMethods.includes(method)
      );
    }
    return allowedMethods.includes(permToCheck.method);
  };

  // If permission is an array, check if any of the permission objects pass.
  if (Array.isArray(permission)) {
    return permission.some(checkPermission);
  }

  // Otherwise, check the single permission object.
  return checkPermission(permission);
};

export default hasPermission;
