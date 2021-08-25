import { APP_PREFIX_PATH } from "configs/AppConfig";
import { Roles } from "types";
import {
  faExclamationCircle,
  faUsers,
  faComments,
  faCity,
} from "@fortawesome/pro-light-svg-icons";

export interface MenuItem {
  key: string;
  path: string;
  title: string;
  icon: any;
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
    key: "incidents",
    path: `${APP_PREFIX_PATH}/incidents`,
    title: "sidenav.incidents",
    icon: faExclamationCircle,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "offenders",
    path: `${APP_PREFIX_PATH}/offenders`,
    title: "sidenav.offenders",
    icon: faUsers,
    breadcrumb: true,
    submenu: [],
  },
  {
    key: "chat",
    path: `${APP_PREFIX_PATH}/chat`,
    title: "sidenav.chat",
    icon: faComments,
    breadcrumb: true,
    submenu: [],
  },
];

const adminOnlyItems: NavItem[] = [
  {
    key: "scheme",
    path: `${APP_PREFIX_PATH}/scheme-settings`,
    title: "sidenav.scheme",
    icon: faCity,
    breadcrumb: true,
    submenu: [],
  },
];

const navigationConfig = [...userOnlyItems, ...adminOnlyItems];

export default navigationConfig;
