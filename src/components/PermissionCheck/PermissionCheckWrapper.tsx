import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import type {
  PermissionMethod,
  PermissionModel,
} from '../../graphql/generated';
import { useStoreState } from '../../state';
import hasPermission from '../../utils/has-permission';

interface ModelMethod {
  model: PermissionModel;
  method: PermissionMethod | PermissionMethod[];
}
interface Props {
  children: JSX.Element;
  permission: ModelMethod | ModelMethod[];
  unauthorizedElement?: JSX.Element;
}
/**
 * `PermissionCheckWrapper` is a higher-order component designed for handling access control in a React application. It checks if the current user possesses the required permissions to access a specified part of the application. This component is useful in restricting access to certain UI components based on user permissions.
 *
 * Usage:
 * Wrap `PermissionCheckWrapper` around any component that requires permission checks. Specify the required permissions in the `permission` prop.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {JSX.Element} props.children - The child components to render if the user has the necessary permissions.
 * @param {Object} props.permission - The permissions required to access the child components.
 *   @param {PermissionModel} props.permission.model - The model of the required permissions (e.g., 'incident', 'offender').
 *   @param {PermissionMethod} props.permission.method - The method of the required permissions (e.g., 'read', 'write').
 * @param {JSX.Element} [props.unauthorizedElement=<Navigate to="/" />] - The element to render if the user lacks the required permissions. Defaults to redirecting to the home page.
 *
 * @returns {JSX.Element} - Renders the child components if the user has the required permissions; otherwise, renders the `unauthorizedElement`. If no unauthorizedElement is passed in it will redirect to dashboard

 */
const PermissionCheckWrapper = ({
  children,
  permission,
  unauthorizedElement = <Navigate to="/" />,
}: Props): JSX.Element => {
  const { schemes } = useStoreState((state) => state.user);
  const { id: currentSchemeId } = useStoreState((state) => state.scheme);
  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === currentSchemeId),
    [schemes, currentSchemeId]
  );
  const permissions = currentScheme?.permissions;
  const isAuthorized = useMemo(() => {
    if (typeof permission === 'object' && !Array.isArray(permission)) {
      return hasPermission({ permissions, permission });
    }
    if (Array.isArray(permission)) {
      return permission.some((perm) =>
        hasPermission({ permissions, permission: perm })
      );
    }
    return false;
  }, [permissions, permission]);

  return isAuthorized ? children : unauthorizedElement;
};

export default PermissionCheckWrapper;
