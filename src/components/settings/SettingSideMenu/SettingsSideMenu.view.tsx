import { useStoreState } from '#/state';
import hasRolePermission from '#/utils/has-role-permission';
import {
  AppstoreOutlined,
  BranchesOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CommentOutlined,
  ContainerOutlined,
  DashboardOutlined,
  DeleteOutlined,
  DesktopOutlined,
  EyeOutlined,
  FileTextOutlined,
  InboxOutlined,
  LeftOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SafetyOutlined,
  SettingOutlined,
  ShareAltOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  faCloudDownload,
  faCloudUpload,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip, Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, matchPath, useLocation } from 'react-router-dom';

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
  const location = useLocation();

  const settingsCategories = [
    {
      category: intl.formatMessage({ defaultMessage: 'Access Management' }),
      items: [
        {
          icon: <UserOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.Users,
          },
          title: intl.formatMessage({ defaultMessage: 'Users' }),
          to: '/app/scheme-settings/users',
        },
        {
          icon: <SafetyOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.Roles,
          },
          title: intl.formatMessage({ defaultMessage: 'Roles' }),
          to: '/app/scheme-settings/roles',
        },
        {
          icon: <TeamOutlined />,
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
          icon: <CommentOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.ChatGroups,
          },
          title: intl.formatMessage({
            defaultMessage: 'Chat Groups',
          }),
          to: '/app/scheme-settings/chat-groups',
        },
      ],
    },
    {
      category: intl.formatMessage({ defaultMessage: 'System Configuration' }),
      items: [
        {
          icon: <SettingOutlined />,
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
          icon: <ShareAltOutlined />,
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
          icon: <AppstoreOutlined />,
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
          icon: <DesktopOutlined />,
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
          icon: <QuestionCircleOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.IncidentOptions,
          },
          title: intl.formatMessage({
            defaultMessage: 'Question Management',
          }),
          to: '/app/scheme-settings/questions',
        },
        {
          icon: <AppstoreOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.Businesses,
          },
          title: intl.formatMessage({
            defaultMessage: 'Business Options',
          }),
          to: '/app/scheme-settings/business-options',
        },
        {
          icon: <InboxOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.Businesses,
          },
          title: intl.formatMessage({
            defaultMessage: 'Stock Items',
          }),
          to: '/app/scheme-settings/stock-items',
        },
      ],
    },
    {
      category: intl.formatMessage({ defaultMessage: 'Content & Workflows' }),
      items: [
        {
          icon: <DashboardOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.Dashboards,
          },
          title: intl.formatMessage({ defaultMessage: 'Dashboards' }),
          to: '/app/manage-dashboard/',
        },
        {
          icon: <BranchesOutlined />,
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
          icon: <ContainerOutlined />,
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
          icon: <CalendarOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.TaskSettings,
          },
          title: intl.formatMessage({
            defaultMessage: 'Activity Settings',
          }),
          to: '/app/scheme-settings/activity-settings',
        },
      ],
    },
    {
      category: intl.formatMessage({ defaultMessage: 'Incident Management' }),
      items: [
        {
          icon: <FileTextOutlined />,
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
          icon: <CheckCircleOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.IncidentOptions,
          },
          title: intl.formatMessage({
            defaultMessage: 'Incident Statuses',
          }),
          to: '/app/scheme-settings/incident-statuses',
        },
        {
          icon: <WarningOutlined />,
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
          icon: <PictureOutlined />,
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
          icon: <EyeOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.VisionAiSettings,
          },
          title: intl.formatMessage({
            defaultMessage: 'Vision AI Settings',
          }),
          to: '/app/scheme-settings/vision-ai-settings',
        },
      ],
    },
    {
      category: intl.formatMessage({ defaultMessage: 'Data & Compliance' }),
      items: [
        {
          icon: <FontAwesomeIcon icon={faCloudUpload} />,
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
          icon: <FontAwesomeIcon icon={faCloudDownload} />,
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
          icon: <SolutionOutlined />,
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
          icon: <DeleteOutlined />,
          permissions: {
            method: PermissionMethod.Read,
            model: PermissionModel.Settings,
          },
          title: intl.formatMessage({
            defaultMessage: 'Recycle Bin',
          }),
          to: '/app/scheme-settings/recycle-bin',
        },
      ],
    },
  ];
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const isDark = currentTheme === 'dark';
  const renderMenuItems = () =>
    settingsCategories.map((category, categoryIndex) => {
      const visibleItems = category.items.filter((item) =>
        hasRolePermission({ permission: item.permissions })
      );

      if (visibleItems.length === 0) return null;

      return (
        <div className={classes.section} key={categoryIndex}>
          <Typography.Text className={classes.sectionTitle}>
            {category.category}
          </Typography.Text>
          {visibleItems.map((item) => {
            const isActive = matchPath(item.to, location.pathname);
            return (
              <Link key={item.to} to={item.to}>
                <div className={`${classes.item} ${isActive ? 'active' : ''}`}>
                  <span className={classes.icon}>{item.icon}</span>
                  <Typography.Text className={classes.text}>
                    {item.title}
                  </Typography.Text>
                </div>
              </Link>
            );
          })}
        </div>
      );
    });
  return (
    <Sider
      collapsed={collapsed}
      collapsible
      style={{
        background: 'transparent',
        borderRight: 'none',
      }}
      trigger={null}
      width={260}
    >
      <Button
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        shape="circle"
        size="small"
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          fontSize: '10px',
          left: collapsed ? 60 : undefined,
          position: 'absolute',
          right: collapsed ? undefined : -18,

          top: 15,
          zIndex: 1000,
        }}
        type="default"
      />
      {collapsed ? (
        <div
          style={{
            borderRight: isDark ? '1px solid #4d5b75' : '1px solid #e8e8e8',
            height: '100vh',
            overflow: 'auto',
            padding: '24px 0',
            width: 80,
          }}
        >
          {settingsCategories.map((category) => {
            const visibleItems = category.items.filter((item) =>
              hasRolePermission({ permission: item.permissions })
            );
            return visibleItems.map((item) => {
              const isActive = matchPath(item.to, location.pathname);
              return (
                <Tooltip title={item.title}>
                  <Link key={item.to} to={item.to}>
                    <div
                      style={{
                        background: isActive
                          ? 'rgba(222, 68, 54, 0.08)'
                          : 'transparent',
                        borderLeft: isActive
                          ? '3px solid #de4436'
                          : '3px solid transparent',
                        cursor: 'pointer',
                        padding: '12px 0',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          color: isActive ? '#de4436' : '#7284a8',
                          fontSize: 18,
                        }}
                      >
                        {item.icon}
                      </span>
                    </div>
                  </Link>
                </Tooltip>
              );
            });
          })}
        </div>
      ) : (
        <div className={classes.container}>
          <Typography.Paragraph className={classes.menuTitle}>
            <FormattedMessage defaultMessage="Settings" />
          </Typography.Paragraph>
          <div className={classes.divider} />
          {renderMenuItems()}
        </div>
      )}
    </Sider>
  );
};

export default SettingsSideMenu;
