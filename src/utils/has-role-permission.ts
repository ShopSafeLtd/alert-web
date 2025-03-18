import type { PermissionMethod, PermissionModel } from 'graphql/types';

import { useStoreState } from '#/state';
import { useMemo } from 'react';

interface PermissionMethodModal {
  method: PermissionMethod | PermissionMethod[];
  model: PermissionModel;
}

type Permission = {
  permission: PermissionMethodModal | PermissionMethodModal[];
};

// Define the schema for the permissions in the store
interface PermissionSchema {
  allowedMethods: PermissionMethod[];
  model: PermissionModel;
}

interface SchemeData {
  permissions: PermissionSchema[];
  scheme: {
    id: string;
  };
}

/**
 * @param {Permission} params - Object containing the permission you want to check
 * @returns {boolean} - Returns true if the user has the permission
 */
const hasRolePermission = ({ permission }: Permission): boolean => {
  const currentSchemeId = useStoreState((state) => state.scheme.id);
  const schemes = useStoreState((state) => state.user.schemes) as SchemeData[];
  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === currentSchemeId),
    [schemes, currentSchemeId]
  );
  const permissions = currentScheme?.permissions;

  if (!permissions) {
    return false;
  }

  // Handle the case when permission is an array
  if (Array.isArray(permission)) {
    return permission.some((perm) => checkSinglePermission(perm, permissions));
  }

  // Handle the case when permission is a single object
  return checkSinglePermission(permission, permissions);
};

/**
 * Helper function to check a single permission object against available permissions
 * @param {PermissionMethodModal} permission - The permission to check
 * @param {PermissionSchema[]} permissions - Available permissions
 * @returns {boolean} - Returns true if the permission is allowed
 */
const checkSinglePermission = (
  permission: PermissionMethodModal,
  permissions: PermissionSchema[]
): boolean => {
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
