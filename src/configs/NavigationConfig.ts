// noinspection AllyPlainJsInspection

import { APP_PREFIX_PATH } from 'configs/AppConfig';
import {
  faAddressCard,
  faAperture,
  faBolt,
  faBoot,
  faBoxCheck,
  faBuildings,
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
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';

import { defineMessage } from 'react-intl';
import { PermissionMethod, PermissionModel } from 'graphql/types';

export enum BadgeTypes {
  todo = 'TODO',
  notification = 'NOTIFICATION',
  message = 'MESSAGE',
}

export interface MenuItem {
  key: string;
  path: string;
  title: string;
  icon: IconDefinition;
  breadcrumb: boolean;
  badge?: BadgeTypes;
  intl: { id: string; defaultMessage: string };
  permission?: {
    model: PermissionModel;
    method: PermissionMethod;
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
        method: PermissionMethod.Read,
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
        method: PermissionMethod.Read,
      },
    ],
    intl: defineMessage({
      id: 'Activities',
      defaultMessage: 'Activities',
    }),
  },
  {
    key: 'suggestions',
    path: `${APP_PREFIX_PATH}/suggestions`,
    title: 'Compass',
    icon: faBolt,
    breadcrumb: true,
    intl: defineMessage({
      id: 'Compass',
      defaultMessage: 'Compass',
    }),
    permission: [
      {
        model: PermissionModel.Automations,
        method: PermissionMethod.Read,
      },
    ],
    submenu: [],
  },
  {
    key: 'vision',
    path: `${APP_PREFIX_PATH}/vision`,
    title: 'Vision',
    icon: faAperture,
    breadcrumb: true,
    intl: defineMessage({
      id: 'Vision',
      defaultMessage: 'Vision',
    }),
    permission: [
      {
        model: PermissionModel.VisionAi,
        method: PermissionMethod.Read,
      },
    ],
    submenu: [],
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
        method: PermissionMethod.Read,
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
    permission: [
      {
        model: PermissionModel.Offenders,
        method: PermissionMethod.Read,
      },
      {
        method: PermissionMethod.Read,
        model: PermissionModel.CrimeGroups,
      },
      {
        model: PermissionModel.Vehicles,
        method: PermissionMethod.Read,
      },
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
            method: PermissionMethod.Read,
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
            method: PermissionMethod.Read,
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
            method: PermissionMethod.Read,
          },
        ],
      },
    ],
  },
  {
    key: 'businesses',
    path: `${APP_PREFIX_PATH}/businesses`,
    title: 'Businesses',
    icon: faBuildings,
    breadcrumb: true,
    intl: defineMessage({
      id: 'businesses',
      defaultMessage: 'Businesses',
    }),
    permission: [
      {
        model: PermissionModel.Businesses,
        method: PermissionMethod.Read,
      },
    ],
    submenu: [],
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
        method: PermissionMethod.Read,
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
        method: PermissionMethod.Read,
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
        method: PermissionMethod.Read,
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
        method: PermissionMethod.Read,
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
        method: PermissionMethod.Read,
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
        path: `${APP_PREFIX_PATH}/resources/folders`,
        title: 'Documents',
        icon: faFile,
        breadcrumb: true,
        submenu: [],
        permission: [
          {
            model: PermissionModel.Documents,
            method: PermissionMethod.Read,
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
        method: PermissionMethod.Read,
      },
    ],
    submenu: [],
  },
  {
    key: 'singleShoeSystem',
    path: `${APP_PREFIX_PATH}/singleShoeSystem`,
    title: 'SingleShoeSystem',
    icon: faBoot,
    breadcrumb: true,
    intl: defineMessage({
      id: 'Single Shoe',
      defaultMessage: 'Single Shoe',
    }),
    permission: [
      {
        model: PermissionModel.SingleShoe,
        method: PermissionMethod.Read,
      },
    ],
    submenu: [],
  },
  {
    key: 'stockRemovalRequests',
    path: `${APP_PREFIX_PATH}/stock-removal-requests`,
    title: 'Stock Removal Requests',
    icon: faBoxCheck,
    breadcrumb: true,
    intl: defineMessage({
      id: 'Stock Removal',
      defaultMessage: 'Stock Removal',
    }),
    permission: [
      {
        model: PermissionModel.StockRemovalRequests,
        method: PermissionMethod.Read,
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
        method: PermissionMethod.Read,
      },
    ],
    submenu: [],
  },
];

export default navigationConfig;
