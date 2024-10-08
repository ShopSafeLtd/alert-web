import { useStoreState } from '#/state';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { PermissionModel } from 'graphql/types';
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
  const currentSchemeId = useStoreState((state) => state.scheme.id);
  const schemes = useStoreState((state) => state.user.schemes);
  const permissions =
    schemes
      .find((scheme) => scheme.scheme.id === currentSchemeId)
      ?.permissions.filter((item) => item.allowedMethods.length > 0)
      .map(({ model }) => model) || [];

  const settings = [
    {
      permissions: [PermissionModel.Users],
      title: intl.formatMessage({ defaultMessage: 'Users' }),
      to: '/app/scheme-settings/users',
    },
    {
      permissions: [PermissionModel.Businesses],
      title: intl.formatMessage({
        defaultMessage: 'Businesses',
      }),
      to: '/app/scheme-settings/businesses',
    },
    {
      permissions: [PermissionModel.Businesses],
      title: intl.formatMessage({
        defaultMessage: 'Brands',
      }),
      to: '/app/scheme-settings/brands',
    },
    {
      permissions: [PermissionModel.Roles],
      title: intl.formatMessage({ defaultMessage: 'Roles' }),
      to: '/app/scheme-settings/roles',
    },
    {
      permissions: [PermissionModel.Groups],
      title: intl.formatMessage({
        defaultMessage: 'Content Groups',
      }),
      to: '/app/scheme-settings/groups',
    },
    {
      permissions: [PermissionModel.ChatGroups],
      title: intl.formatMessage({
        defaultMessage: 'Chat Groups',
      }),
      to: '/app/scheme-settings/chat-groups',
    },
    {
      permissions: [PermissionModel.GeneralSettings],
      title: intl.formatMessage({
        defaultMessage: 'General Settings',
      }),
      to: '/app/scheme-settings/scheme',
    },
    {
      permissions: [PermissionModel.SharingSettings],
      title: intl.formatMessage({
        defaultMessage: 'Sharing Settings',
      }),
      to: '/app/scheme-settings/scheme-sharing',
    },
    {
      permissions: [PermissionModel.Dashboard],
      title: intl.formatMessage({ defaultMessage: 'Dashboards' }),
      to: '/app/manage-dashboard/',
    },
    {
      permissions: [PermissionModel.IncidentOptions],
      title: intl.formatMessage({
        defaultMessage: 'Incident Options',
      }),
      to: '/app/scheme-settings/crime-types',
    },
    {
      permissions: [PermissionModel.OffenderWarnings],
      title: intl.formatMessage({
        defaultMessage: 'Offender Warnings',
      }),
      to: '/app/scheme-settings/offender-warnings',
    },
    {
      permissions: [PermissionModel.OffenderGalleries],
      title: intl.formatMessage({
        defaultMessage: 'Offender Galleries',
      }),
      to: '/app/scheme-settings/custom-galleries',
    },
    {
      permissions: [PermissionModel.Workflows],
      title: intl.formatMessage({
        defaultMessage: 'Workflows',
      }),
      to: '/app/scheme-settings/workflow',
    },
    {
      permissions: [PermissionModel.StatementTemplates],
      title: intl.formatMessage({
        defaultMessage: 'Statement Templates',
      }),
      to: '/app/scheme-settings/statement-templates',
    },
    {
      permissions: [PermissionModel.Terms],
      title: intl.formatMessage({
        defaultMessage: 'Terms & Conditions',
      }),
      to: '/app/scheme-settings/terms',
    },
    {
      permissions: [PermissionModel.DataImport],
      title: intl.formatMessage({
        defaultMessage: 'Data Import',
      }),
      to: '/app/scheme-settings/data-import',
    },
    {
      permissions: [PermissionModel.DataExport],
      title: intl.formatMessage({
        defaultMessage: 'Data Export',
      }),
      to: '/app/scheme-settings/data-export/export-incidents',
    },
    {
      permissions: [PermissionModel.RecycleBin],
      title: intl.formatMessage({
        defaultMessage: 'Recycle Bin',
      }),
      to: '/app/scheme-settings/recycle-bin',
    },
  ];

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

          {settings
            .filter(
              (item) =>
                item.permissions &&
                permissions.some((perm) => item.permissions.includes(perm))
            )
            .map((item) => (
              <Link key={item.to} to={item.to}>
                <div className={classes.item}>
                  <Typography.Text className={classes.text}>
                    {item.title}
                  </Typography.Text>
                </div>
              </Link>
            ))}
        </div>
      )}
    </Sider>
  );
};

export default SettingsSideMenu;
