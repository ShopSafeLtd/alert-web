import { APP_PREFIX_PATH } from 'configs/AppConfig';
import {
  faCar,
  faExclamationCircle,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { Role } from 'graphql/generated';
import { defineMessage } from 'react-intl';

export interface MenuItem {
  key: string;
  path: string;
  title: string;
  icon?: any;
  breadcrumb: boolean;
  roles?: Role[];
  // badge?: boolean;
  intl: { id: string; defaultMessage: string };
}

export interface SubMenuItem extends MenuItem {
  submenu: MenuItem[];
}

export interface NavItem extends MenuItem {
  submenu: SubMenuItem[];
}

export type NavTree = NavItem[];

const ReportOnlyNavigationConfig: NavItem[] = [
  {
    key: 'incidents',
    path: `${APP_PREFIX_PATH}/incidents/add`,
    title: 'Incidents',
    icon: faExclamationCircle,
    breadcrumb: true,
    submenu: [],
    intl: defineMessage({
      id: 'incidents',
      defaultMessage: 'Incidents',
    }),
    roles: [Role.User],
  },
  {
    key: 'offenders',
    path: `${APP_PREFIX_PATH}/offenders/add`,
    title: 'Offenders',
    icon: faUsers,
    breadcrumb: true,
    submenu: [],
    intl: defineMessage({
      id: 'offenders',
      defaultMessage: 'Offenders',
    }),
    roles: [Role.User],
  },
  {
    key: 'vehicles',
    path: `${APP_PREFIX_PATH}/vehicles/add`,
    title: 'Vehicles',
    icon: faCar,
    intl: defineMessage({
      id: 'vehicles',
      defaultMessage: 'Vehicles',
    }),
    breadcrumb: true,
    submenu: [],
    roles: [Role.User],
  },
];

export default ReportOnlyNavigationConfig;
