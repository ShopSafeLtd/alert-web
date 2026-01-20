import { currentPermissionsAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Card, Typography } from 'antd';
import { PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const PoliceSettingsRedirect = (): JSX.Element => {
  const navigate = useNavigate();
  const permissions = useAtomValue(currentPermissionsAtom)?.map(
    ({ model }) => model
  );

  const hasUsersPermission = permissions?.includes(PermissionModel.Users);
  const hasRolesPermission = permissions?.includes(PermissionModel.Roles);
  const hasPoliceSettingsPermission = permissions?.includes(
    PermissionModel.PoliceSettings
  );

  useEffect(() => {
    if (hasUsersPermission) {
      navigate('/app/police-settings/users', { replace: true });
    } else if (hasRolesPermission) {
      navigate('/app/police-settings/roles', { replace: true });
    } else if (hasPoliceSettingsPermission) {
      navigate('/app/police-settings/reporting-areas', { replace: true });
    }
  }, [
    hasUsersPermission,
    hasRolesPermission,
    hasPoliceSettingsPermission,
    navigate,
  ]);

  // Show message if user has no permissions (edge case)
  if (
    !hasUsersPermission &&
    !hasRolesPermission &&
    !hasPoliceSettingsPermission
  ) {
    return (
      <Card>
        <Typography.Title level={3}>
          <FormattedMessage defaultMessage="No Access" />
        </Typography.Title>
        <Typography.Paragraph>
          <FormattedMessage defaultMessage="You do not have permission to access any settings pages. Please contact your administrator." />
        </Typography.Paragraph>
      </Card>
    );
  }

  // Show loading state while redirecting
  return <></>;
};

export default PoliceSettingsRedirect;
