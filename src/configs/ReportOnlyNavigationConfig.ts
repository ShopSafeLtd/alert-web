import { APP_PREFIX_PATH } from 'configs/AppConfig';
import {
  faCar,
  faExclamationCircle,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { defineMessage } from 'react-intl';
import { NavItem } from './NavigationConfig';
import { Role } from 'graphql/types';

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
