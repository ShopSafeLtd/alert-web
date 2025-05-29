import hasRolePermission from '#/utils/has-role-permission';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './SettingsSideMenu.style';

const SettingsSideMenu = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (i: boolean) => void;
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const settings = [
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Users,
      },
      title: intl.formatMessage({ defaultMessage: 'Users' }),
      to: '/app/scheme-settings/users',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Brands,
      },
      title: intl.formatMessage({
        defaultMessage: 'Brands',
      }),
      to: '/app/scheme-settings/brands',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Roles,
      },
      title: intl.formatMessage({ defaultMessage: 'Roles' }),
      to: '/app/scheme-settings/roles',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Groups,
      },
      title: intl.formatMessage({
        defaultMessage: 'Content Groups',
      }),
      to: '/app/scheme-settings/groups',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.ChatGroups,
      },
      title: intl.formatMessage({
        defaultMessage: 'Chat Groups',
      }),
      to: '/app/scheme-settings/chat-groups',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Dem,
      },
      title: intl.formatMessage({
        defaultMessage: 'DEM',
      }),
      to: '/app/scheme-settings/dem',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.GeneralSettings,
      },
      title: intl.formatMessage({
        defaultMessage: 'General Settings',
      }),
      to: '/app/scheme-settings/scheme',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.SharingSettings,
      },
      title: intl.formatMessage({
        defaultMessage: 'Sharing Settings',
      }),
      to: '/app/scheme-settings/scheme-sharing',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Dashboard,
      },
      title: intl.formatMessage({ defaultMessage: 'Dashboards' }),
      to: '/app/manage-dashboard/',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.IncidentOptions,
      },
      title: intl.formatMessage({
        defaultMessage: 'Incident Options',
      }),
      to: '/app/scheme-settings/crime-types',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.OffenderWarnings,
      },
      title: intl.formatMessage({
        defaultMessage: 'Offender Warnings',
      }),
      to: '/app/scheme-settings/offender-warnings',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.OffenderWarnings,
      },
      title: intl.formatMessage({
        defaultMessage: 'Offender Galleries',
      }),
      to: '/app/scheme-settings/custom-galleries',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Workflows,
      },
      title: intl.formatMessage({
        defaultMessage: 'Workflows',
      }),
      to: '/app/scheme-settings/workflow',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.VisionAiSettings,
      },
      title: intl.formatMessage({
        defaultMessage: 'Vision AI Settings',
      }),
      to: '/app/scheme-settings/vision-ai-settings',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.TaskSettings,
      },
      title: intl.formatMessage({
        defaultMessage: 'Activity Settings',
      }),
      to: '/app/scheme-settings/activity-settings',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.StatementTemplates,
      },
      title: intl.formatMessage({
        defaultMessage: 'Statement Templates',
      }),
      to: '/app/scheme-settings/statement-templates',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Terms,
      },
      title: intl.formatMessage({
        defaultMessage: 'Terms & Conditions',
      }),
      to: '/app/scheme-settings/terms',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.DataImport,
      },
      title: intl.formatMessage({
        defaultMessage: 'Data Import',
      }),
      to: '/app/scheme-settings/data-import',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.DataExport,
      },
      title: intl.formatMessage({
        defaultMessage: 'Data Export',
      }),
      to: '/app/scheme-settings/data-export',
    },
    {
      permissions: {
        method: PermissionMethod.Read,
        model: PermissionModel.Settings,
      },
      title: intl.formatMessage({
        defaultMessage: 'Recycle Bin',
      }),
      to: '/app/scheme-settings/recycle-bin',
    },
  ]
    .filter((item) => hasRolePermission({ permission: item.permissions }))
    .map((item) => (
      <Link key={item.to} to={item.to}>
        <div className={classes.item}>
          <Typography.Text className={classes.text}>
            {item.title}
          </Typography.Text>
        </div>
      </Link>
    ));
  return (
    <Sider collapsed={collapsed} collapsible trigger={null}>
      <Button
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        shape="circle"
        size="small"
        style={{
          fontSize: '16px',
          left: collapsed ? -18 : undefined,
          position: 'absolute',
          right: collapsed ? undefined : -18,
          top: 400,
          zIndex: 1000,
        }}
        type="default"
      />
      {collapsed ? (
        <div style={{ width: 20 }} />
      ) : (
        <div className={classes.container}>
          <Typography.Paragraph className={classes.menuTitle}>
            <FormattedMessage defaultMessage="Settings" />
          </Typography.Paragraph>
          {...settings}
        </div>
      )}
    </Sider>
  );
};

export default SettingsSideMenu;
