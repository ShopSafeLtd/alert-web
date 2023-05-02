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
  faHome,
  faLineChart,
  faListCheck,
  faMapLocationDot,
  faPeopleGroup,
  faPieChart,
  faSirenOn,
  faTrash,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { Role } from 'graphql/generated';

export interface MenuItem {
  key: string;
  path: string;
  title: string;
  icon?: any;
  breadcrumb: boolean;
  roles?: Role[];
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
  },
  {
    key: 'adminTodo',
    path: `${APP_PREFIX_PATH}/adminTodo`,
    title: 'Admin To-DO',
    icon: faCalendarCheck,
    breadcrumb: false,
    submenu: [],
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
  },
  {
    key: 'incidents',
    path: `${APP_PREFIX_PATH}/incidents`,
    title: 'sidenav.incidents',
    icon: faExclamationCircle,
    breadcrumb: true,
    submenu: [],
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
  },
  {
    key: 'profiles',
    path: `${APP_PREFIX_PATH}/profiles`,
    title: 'sidenav.profiles',
    icon: faAddressCard,
    breadcrumb: true,
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
    submenu: [
      {
        key: 'offenders',
        path: `${APP_PREFIX_PATH}/offenders`,
        title: 'sidenav.offenders',
        icon: faUsers,
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
        key: 'crime-groups',
        path: `${APP_PREFIX_PATH}/crime-groups`,
        title: 'Crime Groups',
        icon: faPeopleGroup,
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
        key: 'vehicles',
        path: `${APP_PREFIX_PATH}/vehicles`,
        title: 'Vehicles',
        icon: faCar,
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
    title: 'sidenav.chat',
    icon: faComments,
    breadcrumb: true,
    submenu: [],
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
  },
  {
    key: 'investigations',
    path: `${APP_PREFIX_PATH}/investigations`,
    title: 'sidenav.investigations',
    icon: faClipboard,
    breadcrumb: true,
    submenu: [],
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
  },
  {
    key: 'resources',
    path: `${APP_PREFIX_PATH}/resources`,
    title: 'sidenav.resources',
    icon: faCircleInfo,
    breadcrumb: true,
    roles: [Role.User, Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin],
    submenu: [
      {
        key: 'training',
        path: `${APP_PREFIX_PATH}/resources/training`,
        title: 'sidenav.training',
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
        path: `${APP_PREFIX_PATH}/resources/documents`,
        title: 'sidenav.documents',
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
    title: 'sidenav.reports',
    icon: faLineChart,
    breadcrumb: true,
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
    submenu: [
      {
        key: 'performance',
        path: `${APP_PREFIX_PATH}/reports/performance-report`,
        title: 'Performance',
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
      },
      {
        key: 'business',
        path: `${APP_PREFIX_PATH}/reports/business`,
        title: 'Business',
        icon: faBuilding,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'business-engagement',
        path: `${APP_PREFIX_PATH}/reports/business-engagement`,
        title: 'Business Engagement',
        icon: faBuilding,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'incidentMap',
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
        icon: faPeopleGroup,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
  {
    key: 'settings',
    path: `${APP_PREFIX_PATH}/scheme-settings`,
    title: 'sidenav.settings',
    icon: faCog,
    breadcrumb: true,
    roles: [Role.SchemeAdmin, Role.ShopsafeAdmin],
    submenu: [
      {
        key: 'users',
        path: `${APP_PREFIX_PATH}/scheme-settings/users`,
        title: 'Users',
        icon: faUser,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'businesses',
        path: `${APP_PREFIX_PATH}/scheme-settings/businesses`,
        title: 'Businesses',
        icon: faBuilding,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'groups',
        path: `${APP_PREFIX_PATH}/scheme-settings/groups`,
        title: 'Groups',
        icon: faUsers,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'chat-groups',
        path: `${APP_PREFIX_PATH}/scheme-settings/chat-groups`,
        title: 'Chat Groups',
        icon: faCommentLines,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'scheme-details',
        path: `${APP_PREFIX_PATH}/scheme-settings/scheme-details`,
        title: 'Scheme Settings',
        icon: faListCheck,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'terms',
        path: `${APP_PREFIX_PATH}/scheme-settings/terms`,
        title: 'Terms & Conditions',
        icon: faClipboardList,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'offender-warnings',
        path: `${APP_PREFIX_PATH}/scheme-settings/offender-warnings`,
        title: 'Offender Warnings',
        icon: faCircleExclamation,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'crime-types',
        path: `${APP_PREFIX_PATH}/scheme-settings/crime-types`,
        title: 'Incident Settings',
        icon: faSirenOn,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'recycle-bin',
        path: `${APP_PREFIX_PATH}/scheme-settings/recycle-bin`,
        title: 'Recycle Bin',
        icon: faTrash,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...userOnlyItems, ...adminOnlyItems];

export default navigationConfig;
