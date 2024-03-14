// noinspection AllyPlainJsInspection

import { APP_PREFIX_PATH } from 'configs/AppConfig';
import {
  faAddressCard,
  faArrowProgress,
  faBuilding,
  faCalendarCheck,
  faCar,
  faChalkboard,
  faCircleExclamation,
  faCircleInfo,
  faClipboard,
  faClipboardList,
  faClipboardListCheck,
  faCog,
  faCommentLines,
  faComments,
  faExclamationCircle,
  faFile,
  faFileExport,
  faFileImport,
  faFilterList,
  faHome,
  faLineChart,
  faListCheck,
  faMapLocationDot,
  faNewspaper,
  faPeopleGroup,
  faPieChart,
  faPlayCircle,
  faSirenOn,
  faTrash,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { PermissionMethod, PermissionModel, Role } from 'graphql/generated';
import { defineMessage } from 'react-intl';

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

const userOnlyItems: NavItem[] = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    icon: faHome,
    breadcrumb: false,
    submenu: [],
    roles: [
      Role.User,
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
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
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin, Role.GroupAdmin],
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
    roles: [
      Role.User,
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
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
    roles: [
      Role.User,
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
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
        roles: [
          Role.User,
          Role.ContentAdmin,
          Role.SchemeAdmin,
          Role.GroupAdmin,
          Role.ShopsafeAdmin,
        ],
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
        roles: [
          Role.User,
          Role.ContentAdmin,
          Role.SchemeAdmin,
          Role.ShopsafeAdmin,
          Role.GroupAdmin,
        ],
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
        roles: [
          Role.User,
          Role.ContentAdmin,
          Role.SchemeAdmin,
          Role.ShopsafeAdmin,
          Role.GroupAdmin,
        ],
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
    roles: [
      Role.User,
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
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
    roles: [
      Role.User,
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
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
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin, Role.GroupAdmin],
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
    requireDemId: true,
    intl: defineMessage({
      id: 'evidence',
      defaultMessage: 'Evidence',
    }),
    roles: [
      Role.User,
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
  },
  {
    key: 'checklists',
    path: `${APP_PREFIX_PATH}/checklists`,
    title: 'Checklists',
    icon: faClipboardListCheck,
    breadcrumb: false,
    submenu: [],
    requireDemId: true,
    intl: defineMessage({
      id: 'checklists',
      defaultMessage: 'Checklists',
    }),
    roles: [
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
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
    roles: [
      Role.User,
      Role.ContentAdmin,
      Role.SchemeAdmin,
      Role.ShopsafeAdmin,
      Role.GroupAdmin,
    ],
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
        roles: [
          Role.User,
          Role.ContentAdmin,
          Role.SchemeAdmin,
          Role.ShopsafeAdmin,
          Role.GroupAdmin,
        ],
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
        roles: [
          Role.User,
          Role.ContentAdmin,
          Role.SchemeAdmin,
          Role.ShopsafeAdmin,
          Role.GroupAdmin,
        ],
        permission: [
          {
            model: PermissionModel.Documents,
          },
        ],
      },
    ],
  },
];

const adminOnlyItems: NavItem[] = [
  {
    key: 'reports',
    path: `${APP_PREFIX_PATH}/reports`,
    title: 'Reports',
    icon: faLineChart,
    breadcrumb: true,
    intl: defineMessage({
      id: 'reports',
      defaultMessage: 'Reports',
    }),
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin, Role.GroupAdmin],
    permission: [
      {
        model: PermissionModel.Reports,
      },
    ],
    submenu: [
      {
        key: 'performance',
        path: `${APP_PREFIX_PATH}/reports/performance-report`,
        title: 'Summary',
        intl: defineMessage({
          id: 'Summary',
          defaultMessage: 'Summary',
        }),
        icon: faPieChart,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'offender',
        path: `${APP_PREFIX_PATH}/reports/offender-profile`,
        title: 'Offender',
        icon: faUser,
        breadcrumb: true,
        submenu: [],
        intl: defineMessage({
          id: 'offender',
          defaultMessage: 'Offender',
        }),
      },
      {
        key: 'business',
        path: `${APP_PREFIX_PATH}/reports/business`,
        title: 'Business',
        intl: defineMessage({
          id: 'business',
          defaultMessage: 'Business',
        }),
        icon: faBuilding,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'business-engagement',
        path: `${APP_PREFIX_PATH}/reports/business-engagement`,
        title: 'Business Engagement',
        icon: faBuilding,
        intl: defineMessage({
          id: 'business-engagement',
          defaultMessage: 'Business Engagement',
        }),
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'user-engagement',
        path: `${APP_PREFIX_PATH}/reports/user-engagement`,
        title: 'User Engagement',
        icon: faUsers,
        intl: defineMessage({
          id: 'user-engagement',
          defaultMessage: 'User Engagement',
        }),
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'incidentMap',
        intl: defineMessage({
          id: 'incidentMap',
          defaultMessage: 'Incident Map',
        }),
        path: `${APP_PREFIX_PATH}/reports/incident-map`,
        title: 'Incident Map',
        icon: faMapLocationDot,
        breadcrumb: true,
        submenu: [],
      },
      // {
      //   key: 'data-audit',
      //   path: `${APP_PREFIX_PATH}/reports/data-audit`,
      //   title: 'Data Audit',
      //   icon: faCalendarLinesPen,
      //   intl: defineMessage({
      //     id: 'data-audit',
      //     defaultMessage: 'Data Audit',
      //   }),
      //   breadcrumb: true,
      //   submenu: [],
      // },
      {
        key: 'crime-groups-report',
        path: `${APP_PREFIX_PATH}/reports/crime-groups`,
        title: 'Crime Groups',
        intl: defineMessage({
          id: 'crime-groups-report',
          defaultMessage: 'Crime Groups',
        }),
        icon: faPeopleGroup,
        breadcrumb: true,
        submenu: [],
      },
    ],
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
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin, Role.GroupAdmin],
    permission: [
      {
        model: PermissionModel.Settings,
      },
    ],
    submenu: [],
  },
];

const navigationConfig = [...userOnlyItems, ...adminOnlyItems];

export default navigationConfig;
