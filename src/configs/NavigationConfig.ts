// noinspection AllyPlainJsInspection

import { APP_PREFIX_PATH } from 'configs/AppConfig';
import {
  faAddressCard,
  faCalendarCheck,
  faCar,
  faChalkboard,
  faCircleInfo,
  faClipboard,
  faClipboardListCheck,
  faCog,
  faComments,
  faExclamationCircle,
  faFile,
  faHome,
  faLineChart,
  faNewspaper,
  faPeopleGroup,
  faPlayCircle,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';

import { defineMessage } from 'react-intl';
import { PermissionMethod, PermissionModel, Role } from 'graphql/types';

export enum BadgeTypes {
  todo = 'TODO',
  notification = 'NOTIFICATION',
  message = 'MESSAGE',
}

export interface MenuItem {
  key: string;
  path: string;
  title: string;
  icon?: any;
  breadcrumb: boolean;
  roles?: Role[];
  // badge?: boolean;
  badge?: BadgeTypes;
  requireDemId?: boolean;
  intl: { id: string; defaultMessage: string };
  childPermissions?: PermissionModel[];
  permission?: {
    model: PermissionModel;
    method?: PermissionMethod[];
  }[];
}

export interface SubMenuItem extends MenuItem {
  submenu: MenuItem[];
}

export interface NavItem extends MenuItem {
  submenu: SubMenuItem[];
}

export type NavTree = NavItem[];

const navigationConfig: NavItem[] = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    icon: faHome,
    breadcrumb: false,
    submenu: [],
    permission: [
      {
        model: PermissionModel.Dashboard,
      },
    ],
    intl: defineMessage({
      id: 'sidenav.dashboard',
      defaultMessage: 'Dashboard',
    }),
  },
  {
    key: 'tasks',
    path: `${APP_PREFIX_PATH}/tasks`,
    title: 'Activities',
    icon: faCalendarCheck,
    breadcrumb: false,
    submenu: [],
    badge: BadgeTypes.todo,
    permission: [
      {
        model: PermissionModel.Tasks,
      },
    ],
    intl: defineMessage({
      id: 'Activities',
      defaultMessage: 'Activities',
    }),
  },
  {
    key: 'incidents',
    path: `${APP_PREFIX_PATH}/incidents`,
    title: 'Incidents',
    icon: faExclamationCircle,
    breadcrumb: true,
    submenu: [],
    intl: defineMessage({
      id: 'incidents',
      defaultMessage: 'Incidents',
    }),
    permission: [
      {
        model: PermissionModel.Incidents,
      },
    ],
  },
  {
    key: 'profiles',
    path: `${APP_PREFIX_PATH}/profiles`,
    title: 'Profiles',
    icon: faAddressCard,
    breadcrumb: true,
    intl: defineMessage({
      id: 'profiles',
      defaultMessage: 'Profiles',
    }),
    childPermissions: [
      PermissionModel.Offenders,
      PermissionModel.CrimeGroups,
      PermissionModel.Vehicles,
    ],
    submenu: [
      {
        key: 'offenders',
        path: `${APP_PREFIX_PATH}/offenders`,
        title: 'Offenders',
        icon: faUsers,
        breadcrumb: true,
        submenu: [],
        intl: defineMessage({
          id: 'offenders',
          defaultMessage: 'Offenders',
        }),
        permission: [
          {
            model: PermissionModel.Offenders,
          },
        ],
      },
      {
        key: 'crime-groups',
        path: `${APP_PREFIX_PATH}/crime-groups`,
        title: 'Crime Groups',
        icon: faPeopleGroup,
        breadcrumb: true,
        submenu: [],
        intl: defineMessage({
          id: 'crime-groups',
          defaultMessage: 'Crime Groups',
        }),
        permission: [
          {
            model: PermissionModel.CrimeGroups,
          },
        ],
      },
      {
        key: 'vehicles',
        path: `${APP_PREFIX_PATH}/vehicles`,
        title: 'Vehicles',
        icon: faCar,
        intl: defineMessage({
          id: 'vehicles',
          defaultMessage: 'Vehicles',
        }),
        breadcrumb: true,
        submenu: [],
        permission: [
          {
            model: PermissionModel.Vehicles,
          },
        ],
      },
    ],
  },
  {
    key: 'chat',
    path: `${APP_PREFIX_PATH}/chat`,
    title: 'Chat',
    icon: faComments,
    breadcrumb: true,
    // badge: BadgeTypes.message,
    submenu: [],
    intl: defineMessage({
      id: 'chat',
      defaultMessage: 'Chat',
    }),
    permission: [
      {
        model: PermissionModel.Chat,
      },
    ],
  },
  {
    key: 'bulletins',
    path: `${APP_PREFIX_PATH}/article`,
    title: 'Bulletins',
    icon: faNewspaper,
    breadcrumb: true,
    intl: defineMessage({
      id: 'bulletins',
      defaultMessage: 'Bulletins',
    }),
    submenu: [],
    permission: [
      {
        model: PermissionModel.Articles,
      },
    ],
  },
  {
    key: 'investigations',
    path: `${APP_PREFIX_PATH}/investigations`,
    title: 'Investigations',
    icon: faClipboard,
    intl: defineMessage({
      id: 'investigations',
      defaultMessage: 'Investigations',
    }),
    breadcrumb: true,
    submenu: [],
    permission: [
      {
        model: PermissionModel.Investigations,
      },
    ],
  },
  // {
  //   key: 'face-ai',
  //   path: `${APP_PREFIX_PATH}/face-ai`,
  //   title: 'sidenav.faceAi',
  //   icon: faUsersViewfinder,
  //   breadcrumb: true,
  //   submenu: [],
  //   roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
  // },
  {
    key: 'evidence',
    path: `${APP_PREFIX_PATH}/evidence`,
    title: 'Evidence',
    icon: faPlayCircle,
    breadcrumb: false,
    submenu: [],
    intl: defineMessage({
      id: 'evidence',
      defaultMessage: 'Evidence',
    }),
    permission: [
      {
        model: PermissionModel.Evidence,
      },
    ],
  },
  {
    key: 'checklists',
    path: `${APP_PREFIX_PATH}/checklists`,
    title: 'Checklists',
    icon: faClipboardListCheck,
    breadcrumb: false,
    submenu: [],
    intl: defineMessage({
      id: 'checklists',
      defaultMessage: 'Checklists',
    }),
    permission: [
      {
        model: PermissionModel.Checklist,
      },
    ],
  },

  {
    key: 'resources',
    path: `${APP_PREFIX_PATH}/resources`,
    title: 'Resources',
    icon: faCircleInfo,
    intl: defineMessage({
      id: 'resources',
      defaultMessage: 'Resources',
    }),
    breadcrumb: true,
    submenu: [
      {
        key: 'training',
        path: `${APP_PREFIX_PATH}/resources/training`,
        title: 'Training',
        intl: defineMessage({
          id: 'training',
          defaultMessage: 'Training',
        }),
        icon: faChalkboard,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'documents',
        intl: defineMessage({
          id: 'documents',
          defaultMessage: 'Documents',
        }),
        path: `${APP_PREFIX_PATH}/resources/documents`,
        title: 'Documents',
        icon: faFile,
        breadcrumb: true,
        submenu: [],
        permission: [
          {
            model: PermissionModel.Documents,
          },
        ],
      },
    ],
  },
  {
    key: 'reports',
    path: `${APP_PREFIX_PATH}/reports`,
    title: 'Reports',
    icon: faLineChart,
    breadcrumb: true,
    intl: defineMessage({
      id: 'reports',
      defaultMessage: 'Reports Centre',
    }),
    permission: [
      {
        model: PermissionModel.Reports,
      },
    ],
    submenu: [],
  },
  {
    key: 'settings',
    path: `${APP_PREFIX_PATH}/scheme-settings`,
    title: 'Settings',
    icon: faCog,
    breadcrumb: true,
    intl: defineMessage({
      id: 'settings',
      defaultMessage: 'Settings',
    }),
    permission: [
      {
        model: PermissionModel.Settings,
      },
    ],
    submenu: [],
  },
];

export default navigationConfig;
