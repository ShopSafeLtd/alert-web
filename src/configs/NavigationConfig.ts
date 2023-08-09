import { APP_PREFIX_PATH } from 'configs/AppConfig';
import {
  faAddressCard,
  faBuilding,
  faCalendarCheck,
  faCar,
  faChalkboard,
  faCircleExclamation,
  faCircleInfo,
  faClipboard,
  faClipboardList,
  faCog,
  faCommentLines,
  faComments,
  faExclamationCircle,
  faFile,
  faFileImport,
  faHome,
  faLineChart,
  faListCheck,
  faMapLocationDot,
  faNewspaper,
  faPeopleGroup,
  faPieChart,
  faSirenOn,
  faTrash,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { Role } from 'graphql/generated';
import { defineMessage } from 'react-intl';

export enum BadgeTypes {
  todo = 'TODO',
  notification = 'NOTIFICATION',
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
  intl: { id: string; defaultMessage: string };
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
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
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
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
    badge: BadgeTypes.todo,
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
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
  },
  {
    key: 'profiles',
    path: `${APP_PREFIX_PATH}/profiles`,
    title: 'Profiles',
    icon: faAddressCard,
    breadcrumb: true,
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
    intl: defineMessage({
      id: 'profiles',
      defaultMessage: 'Profiles',
    }),
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
          Role.ShopsafeAdmin,
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
    submenu: [],
    intl: defineMessage({
      id: 'chat',
      defaultMessage: 'Chat',
    }),
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
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
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
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
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
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
    key: 'resources',
    path: `${APP_PREFIX_PATH}/resources`,
    title: 'Resources',
    icon: faCircleInfo,
    intl: defineMessage({
      id: 'resources',
      defaultMessage: 'Resources',
    }),
    breadcrumb: true,
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
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
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
    submenu: [
      {
        key: 'performance',
        path: `${APP_PREFIX_PATH}/reports/performance-report`,
        title: 'Performance',
        intl: defineMessage({
          id: 'performance',
          defaultMessage: 'Performance',
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
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
    submenu: [
      {
        key: 'users',
        path: `${APP_PREFIX_PATH}/scheme-settings/users`,
        title: 'Users',
        intl: defineMessage({
          id: 'users',
          defaultMessage: 'Users',
        }),
        icon: faUser,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'businesses',
        path: `${APP_PREFIX_PATH}/scheme-settings/businesses`,
        title: 'Businesses',
        intl: defineMessage({
          id: 'businesses',
          defaultMessage: 'Businesses',
        }),
        icon: faBuilding,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'groups',
        path: `${APP_PREFIX_PATH}/scheme-settings/groups`,
        title: 'Groups',
        intl: defineMessage({
          id: 'groups',
          defaultMessage: 'Groups',
        }),
        icon: faUsers,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'chat-groups',
        path: `${APP_PREFIX_PATH}/scheme-settings/chat-groups`,
        title: 'Chat Groups',
        intl: defineMessage({
          id: 'chat-groups',
          defaultMessage: 'Chat Groups',
        }),
        icon: faCommentLines,
        breadcrumb: true,
        submenu: [],
      },

      {
        key: 'scheme-details',
        path: `${APP_PREFIX_PATH}/scheme-settings/scheme-details`,
        title: 'Scheme Settings',
        intl: defineMessage({
          id: 'scheme-details',
          defaultMessage: 'Scheme Settings',
        }),
        icon: faListCheck,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'statement-templates',
        path: `${APP_PREFIX_PATH}/scheme-settings/statement-templates`,
        title: 'Templates',
        intl: defineMessage({
          id: 'statement-templates',
          defaultMessage: 'Templates',
        }),
        icon: faFile,
        breadcrumb: true,
        submenu: [],
        roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
      },
      {
        key: 'terms',
        path: `${APP_PREFIX_PATH}/scheme-settings/terms`,
        title: 'Terms & Conditions',
        intl: defineMessage({
          id: 'terms',
          defaultMessage: 'Terms & Conditions',
        }),
        icon: faClipboardList,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'offender-warnings',
        path: `${APP_PREFIX_PATH}/scheme-settings/offender-warnings`,
        title: 'Offender Warnings',
        intl: defineMessage({
          id: 'offender-warnings',
          defaultMessage: 'Offender Warnings',
        }),
        icon: faCircleExclamation,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'incidentSettings',
        path: `${APP_PREFIX_PATH}/scheme-settings/crime-types`,
        title: 'Incident Settings',
        icon: faSirenOn,
        intl: defineMessage({
          id: 'incidentSettings',
          defaultMessage: 'Incident Settings',
        }),
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'recycle-bin',
        path: `${APP_PREFIX_PATH}/scheme-settings/recycle-bin`,
        title: 'Recycle Bin',
        intl: defineMessage({
          id: 'recycle-bin',
          defaultMessage: 'Recycle Bin',
        }),
        icon: faTrash,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'data-import',
        path: `${APP_PREFIX_PATH}/scheme-settings/data-import`,
        title: 'Data Import',
        intl: defineMessage({
          id: 'data-import',
          defaultMessage: 'Data Import',
        }),
        icon: faFileImport,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...userOnlyItems, ...adminOnlyItems];

export default navigationConfig;
