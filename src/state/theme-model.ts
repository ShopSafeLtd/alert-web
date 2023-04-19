/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';
import { LocalStorageKeys, typedLocalStorage } from 'utils';

export enum NavType {
  SIDE = 'SIDE',
  TOP = 'TOP',
}

export enum SideNavTheme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const ThemeConfig = {
  visibleBottomNav: true,
  visibleAppBar: true,
  visibleAppDrawer: false,
  visibleStatusBar: false,
  multiAppBar: false,
  title: '',
  navbarAction: 'default',
  statusBarText: '',
  search: '',
  searchActive: false,
  searchText: '',
  backLinkTo: '',
  navbarActionDisabled: false,
  newMessages: false,
  newIncidents: false,
  lightbox: false,
  lightboxImages: [],
  lightboxIndex: 0,
  platform: '',
  notification: false,
  notificationText: '',
  notificationBottom: false,

  navCollapsed: false,
  sideNavTheme: SideNavTheme.LIGHT,
  locale: 'en',
  navType: NavType.SIDE,
  topNavColor: '#3e82f7',
  headerNavColor: '',
  mobileNav: false,
  currentTheme:
    (typedLocalStorage.get(LocalStorageKeys.theme) as 'light' | 'dark') ||
    ('light' as 'light' | 'dark'),
};

export interface ThemeModel {
  visibleBottomNav: boolean;
  visibleAppBar: boolean;
  visibleAppDrawer: boolean;
  visibleStatusBar: boolean;
  multiAppBar: boolean;
  title: string;
  navbarAction: string;
  statusBarText: string;
  search: string;
  searchActive: boolean;
  searchText: string;
  backLinkTo: string;
  navbarActionDisabled: boolean;
  newMessages: boolean;
  newIncidents: boolean;
  lightbox: boolean;
  lightboxImages: string[];
  lightboxIndex: number;
  platform: string;
  notification: boolean;
  notificationText: string;
  notificationBottom: boolean;

  clearNav: Action<ThemeModel>;
  setBottomNav: Action<ThemeModel, boolean>;
  setAppBar: Action<ThemeModel, boolean>;
  setTitle: Action<ThemeModel, string>;
  setNewMessages: Action<ThemeModel, boolean>;
  toggleAppDrawer: Action<ThemeModel>;
  setStatusBar: Action<ThemeModel, { visible: boolean; text: string }>;
  setNavBarAction: Action<ThemeModel, string>;
  setMultiAppBar: Action<ThemeModel, boolean>;
  handleSearch: Action<ThemeModel, string>;
  clearSearch: Action<ThemeModel>;
  setSearch: Action<ThemeModel, string>;
  setSearchText: Action<ThemeModel, string>;
  setBackLinkTo: Action<ThemeModel, string>;
  setNavBarActionDisabled: Action<ThemeModel, boolean>;
  toggleLightBox: Action<
    ThemeModel,
    {
      images: any[];
      index: number;
    }
  >;
  setPlatform: Action<ThemeModel, string>;
  toggleNotificationBar: Action<
    ThemeModel,
    {
      status: boolean;
      text: string;
      bottom: boolean;
    }
  >;
  setNewIncidents: Action<ThemeModel>;
  setLightboxIndex: Action<ThemeModel, number>;

  navCollapsed: boolean;
  sideNavTheme: SideNavTheme;
  locale: string;
  navType: NavType;
  topNavColor: string;
  headerNavColor: string;
  mobileNav: boolean;
  currentTheme: 'light' | 'dark';

  toggleCollapsedNav: Action<ThemeModel, boolean>;
  sideNavStyleChange: Action<ThemeModel, SideNavTheme>;
  changeLocale: Action<ThemeModel, string>;
  navTypeChange: Action<ThemeModel, NavType>;
  topNavColorChange: Action<ThemeModel, string>;
  headerNavColorChange: Action<ThemeModel, string>;
  toggleMobileNav: Action<ThemeModel, boolean>;
  switchTheme: Action<ThemeModel, 'light' | 'dark'>;
}

const themeModel: ThemeModel = {
  ...ThemeConfig,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearNav: action((state, _payload) => {
    state.backLinkTo = ThemeConfig.backLinkTo;
    state.currentTheme = ThemeConfig.currentTheme;
    state.headerNavColor = ThemeConfig.headerNavColor;
    state.lightbox = ThemeConfig.lightbox;
    state.lightboxImages = ThemeConfig.lightboxImages;
    state.lightboxIndex = ThemeConfig.lightboxIndex;
    state.locale = ThemeConfig.locale;
    state.mobileNav = ThemeConfig.mobileNav;
    state.multiAppBar = ThemeConfig.multiAppBar;
    state.navCollapsed = ThemeConfig.navCollapsed;
    state.navType = ThemeConfig.navType;
    state.navbarAction = ThemeConfig.navbarAction;
    state.navbarActionDisabled = ThemeConfig.navbarActionDisabled;
    state.newIncidents = ThemeConfig.newIncidents;
    state.newMessages = ThemeConfig.newMessages;
    state.notification = ThemeConfig.notification;
    state.notificationBottom = ThemeConfig.notificationBottom;
    state.notificationText = ThemeConfig.notificationText;
    state.platform = ThemeConfig.platform;
    state.search = ThemeConfig.search;
    state.searchActive = ThemeConfig.searchActive;
    state.sideNavTheme = ThemeConfig.sideNavTheme;
    state.statusBarText = ThemeConfig.statusBarText;
    state.title = ThemeConfig.title;
    state.topNavColor = ThemeConfig.topNavColor;
    state.visibleAppBar = ThemeConfig.visibleAppBar;
    state.visibleAppDrawer = ThemeConfig.visibleAppDrawer;
    state.visibleBottomNav = ThemeConfig.visibleBottomNav;
    state.visibleStatusBar = ThemeConfig.visibleStatusBar;
  }),
  clearSearch: action((state) => {
    state.search = '';
  }),
  handleSearch: action((state, payload) => {
    state.search = payload;
  }),
  setAppBar: action((state, payload) => {
    state.visibleAppBar = payload;
  }),
  setBackLinkTo: action((state, payload) => {
    state.backLinkTo = payload;
  }),
  setBottomNav: action((state, payload) => {
    state.visibleBottomNav = payload;
  }),
  setLightboxIndex: action((state, payload) => {
    state.lightboxIndex = payload;
  }),
  setMultiAppBar: action((state, payload) => {
    state.visibleBottomNav = payload;
  }),
  setNavBarAction: action((state, payload) => {
    state.navbarAction = payload;
  }),
  setNavBarActionDisabled: action((state, payload) => {
    state.navbarActionDisabled = payload;
  }),
  setNewIncidents: action((state) => {
    state.newIncidents = !state.newIncidents;
  }),
  setNewMessages: action((state, payload) => {
    state.newMessages = payload;
  }),
  setPlatform: action((state, payload) => {
    state.platform = payload;
  }),
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  setSearchText: action((state, payload) => {
    state.searchText = payload;
  }),
  setStatusBar: action((state, payload) => {
    state.statusBarText = payload.text;
    state.visibleStatusBar = payload.visible;
  }),
  setTitle: action((state, payload) => {
    state.title = payload;
  }),
  toggleAppDrawer: action((state) => {
    state.visibleAppDrawer = !state.visibleStatusBar;
  }),
  toggleLightBox: action((state, payload) => {
    state.lightbox = !state.lightbox;
    state.lightboxImages = payload.images;
    state.lightboxIndex = payload.index;
  }),
  toggleNotificationBar: action((state, payload) => {
    state.notification = payload.status;
    state.notificationBottom = payload.bottom;
    state.notificationText = payload.text;
  }),

  toggleCollapsedNav: action((state, payload) => {
    state.navCollapsed = payload;
  }),
  sideNavStyleChange: action((state, payload) => {
    state.sideNavTheme = payload;
  }),
  changeLocale: action((state, payload) => {
    state.locale = payload;
  }),
  navTypeChange: action((state, payload) => {
    state.navType = payload;
  }),
  topNavColorChange: action((state, payload) => {
    state.topNavColor = payload;
  }),
  headerNavColorChange: action((state, payload) => {
    state.headerNavColor = payload;
  }),
  toggleMobileNav: action((state, payload) => {
    state.mobileNav = payload;
  }),
  switchTheme: action((state, payload) => {
    typedLocalStorage.set(LocalStorageKeys.theme, payload);
    state.currentTheme = payload;
  }),
};

export default themeModel;
