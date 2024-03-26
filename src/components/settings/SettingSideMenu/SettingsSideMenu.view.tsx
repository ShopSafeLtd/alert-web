import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useStoreState } from '#/state';
import { PermissionModel } from '#/graphql/generated';
import Sider from 'antd/lib/layout/Sider';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
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
      ?.permissions.map(({ model }) => model) || [];

  const settings = [
    {
      title: intl.formatMessage({ id: 'YDMrKK', defaultMessage: 'Users' }),
      to: '/app/scheme-settings/users',
      permissions: [PermissionModel.Settings, PermissionModel.Users],
    },
    {
      title: intl.formatMessage({
        id: 'D0tMhW',
        defaultMessage: 'Businesses',
      }),
      to: '/app/scheme-settings/businesses',
      permissions: [PermissionModel.Settings, PermissionModel.Businesses],
    },
    {
      title: intl.formatMessage({ id: 'c35gM5', defaultMessage: 'Roles' }),
      to: '/app/scheme-settings/roles',
      permissions: [PermissionModel.Settings, PermissionModel.Groups],
    },
    {
      title: intl.formatMessage({
        id: '3lRewT',
        defaultMessage: 'Content Groups',
      }),
      to: '/app/scheme-settings/groups',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: '8TntzL',
        defaultMessage: 'Chat Groups',
      }),
      permissions: [PermissionModel.Settings, PermissionModel.Chat],
      to: '/app/scheme-settings/chat-groups',
    },
    {
      title: intl.formatMessage({
        id: 'yuiyES',
        defaultMessage: 'General Settings',
      }),
      to: '/app/scheme-settings/scheme-settings',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: '0yyHLp',
        defaultMessage: 'Sharing Settings',
      }),
      to: '/app/scheme-settings/scheme-sharing',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({ id: 'nwqt7T', defaultMessage: 'Dashboards' }),
      to: '/app/manage-dashboard/',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: 'yqMG5f',
        defaultMessage: 'Incident Options',
      }),
      to: '/app/scheme-settings/crime-types',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: '1jRWJS',
        defaultMessage: 'Offender Warnings',
      }),
      to: '/app/scheme-settings/offender-warnings',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: 'tT/4is',
        defaultMessage: 'Offender Galleries',
      }),
      to: '/app/scheme-settings/custom-galleries',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: '6La3aS',
        defaultMessage: 'Workflows',
      }),
      to: '/app/scheme-settings/workflow',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: '75itGg',
        defaultMessage: 'Statement Templates',
      }),
      to: '/app/scheme-settings/statement-templates',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: 'arPp4e',
        defaultMessage: 'Terms & Conditions',
      }),
      to: '/app/scheme-settings/terms',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: 'rKcpai',
        defaultMessage: 'Data Import',
      }),
      to: '/app/scheme-settings/data-import',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: 'zWElXZ',
        defaultMessage: 'Data Export',
      }),
      to: '/app/scheme-settings/data-export/export-incidents',
      permissions: [PermissionModel.Settings],
    },
    {
      title: intl.formatMessage({
        id: 'Qc/Mx7',
        defaultMessage: 'Recycle Bin',
      }),
      to: '/app/scheme-settings/recycle-bin',
      permissions: [PermissionModel.Settings],
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Button
        type="default"
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        shape="circle"
        size="small"
        style={{
          position: 'absolute',
          top: 400,
          left: collapsed ? -18 : undefined,
          right: collapsed ? undefined : -18,
          fontSize: '16px',
          zIndex: 99_999,
        }}
      />
      {collapsed ? (
        <div style={{ width: 20 }} />
      ) : (
        <div className={classes.container}>
          <Typography.Paragraph className={classes.menuTitle}>
            <FormattedMessage id="D3idYv" defaultMessage="Settings" />
          </Typography.Paragraph>

          {settings
            .filter(
              (item) =>
                item.permissions &&
                permissions.some((perm) => item.permissions.includes(perm))
            )
            .map((item) => (
              <Link to={item.to}>
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
