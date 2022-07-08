import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { Roles } from 'types';
import {
  faExclamationCircle,
  faUsers,
  faComments,
  faCity,
  faUser,
  faCommentLines,
  faClipboardList,
  faCircleExclamation,
  faSirenOn,
  faTrash,
  faListCheck,
} from '@fortawesome/pro-light-svg-icons';

export interface MenuItem {
  key: string;
  path: string;
  title: string;
  icon?: any;
  breadcrumb: boolean;
  roles?: Roles[];
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
    key: 'incidents',
    path: `${APP_PREFIX_PATH}/incidents`,
    title: 'sidenav.incidents',
    icon: faExclamationCircle,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: 'offenders',
    path: `${APP_PREFIX_PATH}/offenders`,
    title: 'sidenav.offenders',
    icon: faUsers,
    breadcrumb: true,
    submenu: [],
  },
  {
    key: 'chat',
    path: `${APP_PREFIX_PATH}/chat`,
    title: 'sidenav.chat',
    icon: faComments,
    breadcrumb: true,
    submenu: [],
  },
];

const adminOnlyItems: NavItem[] = [
  {
    key: 'scheme',
    path: `${APP_PREFIX_PATH}/scheme-settings`,
    title: 'sidenav.scheme',
    icon: faCity,
    breadcrumb: true,
    submenu: [
      {
        key: 'users',
        path: `${APP_PREFIX_PATH}/scheme-settings/users`,
        title: 'User Management',
        icon: faUser,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'groups',
        path: `${APP_PREFIX_PATH}/scheme-settings/groups`,
        title: 'Group Management',
        icon: faUsers,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'chat-groups',
        path: `${APP_PREFIX_PATH}/scheme-settings/chat-groups`,
        title: 'User Management',
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
        title: 'Crime Types',
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
