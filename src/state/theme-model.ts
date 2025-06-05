/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-param-reassign */

import type { Action } from 'easy-peasy';

import { action } from 'easy-peasy';
import { LocalStorageKeys, typedLocalStorage } from 'utils';

export enum NavType {
  SIDE = 'SIDE',
  TOP = 'TOP',
}

export enum SideNavTheme {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export const ThemeConfig = {
  backLinkTo: '',
  currentTheme:
    (typedLocalStorage.get(LocalStorageKeys.theme) as 'dark' | 'light') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'),
  headerNavColor: '',
  lightbox: false,
  lightboxImages: [],
  lightboxIndex: 0,
  locale:
    typedLocalStorage.get(LocalStorageKeys.lang) ||
    navigator.language.split('-')[0] ||
    'en',
  mobileNav: false,
  multiAppBar: false,
  navCollapsed: false,
  navType: NavType.SIDE,
  navbarAction: 'default',
  navbarActionDisabled: false,
  newIncidents: false,
  newMessages: false,
  notification: false,
  notificationBottom: false,
  notificationText: '',
  platform: '',
  search: '',
  searchActive: false,
  searchText: '',

  sideNavTheme: SideNavTheme.LIGHT,
  statusBarText: '',
  title: '',
  topNavColor: '#3e82f7',
  visibleAppBar: true,
  visibleAppDrawer: false,
  visibleBottomNav: true,
  visibleStatusBar: false,
};

export interface ThemeModel {
  backLinkTo: string;
  changeLocale: Action<ThemeModel, string>;
  clearNav: Action<ThemeModel>;
  clearSearch: Action<ThemeModel>;
  currentTheme: 'dark' | 'light';
  handleSearch: Action<ThemeModel, string>;
  headerNavColor: string;
  headerNavColorChange: Action<ThemeModel, string>;
  lightbox: boolean;
  lightboxImages: string[];
  lightboxIndex: number;
  locale: string;
  mobileNav: boolean;
  multiAppBar: boolean;
  navCollapsed: boolean;
  navType: NavType;
  navTypeChange: Action<ThemeModel, NavType>;
  navbarAction: string;
  navbarActionDisabled: boolean;
  newIncidents: boolean;
  newMessages: boolean;
  notification: boolean;
  notificationBottom: boolean;
  notificationText: string;
  platform: string;
  search: string;
  searchActive: boolean;
  searchText: string;
  setAppBar: Action<ThemeModel, boolean>;
  setBackLinkTo: Action<ThemeModel, string>;
  setBottomNav: Action<ThemeModel, boolean>;
  setLightboxIndex: Action<ThemeModel, number>;
  setMultiAppBar: Action<ThemeModel, boolean>;
  setNavBarAction: Action<ThemeModel, string>;
  setNavBarActionDisabled: Action<ThemeModel, boolean>;
  setNewIncidents: Action<ThemeModel>;
  setNewMessages: Action<ThemeModel, boolean>;
  setPlatform: Action<ThemeModel, string>;
  setSearch: Action<ThemeModel, string>;
  setSearchText: Action<ThemeModel, string>;
  setStatusBar: Action<ThemeModel, { text: string; visible: boolean }>;
  setTitle: Action<ThemeModel, string>;
  sideNavStyleChange: Action<ThemeModel, SideNavTheme>;
  sideNavTheme: SideNavTheme;
  statusBarText: string;
  switchTheme: Action<ThemeModel, 'dark' | 'light'>;
  title: string;
  toggleAppDrawer: Action<ThemeModel>;
  toggleCollapsedNav: Action<ThemeModel, boolean>;
  toggleLightBox: Action<
    ThemeModel,
    {
      images: any[];
      index: number;
    }
  >;
  toggleMobileNav: Action<ThemeModel>;
  toggleNotificationBar: Action<
    ThemeModel,
    {
      bottom: boolean;
      status: boolean;
      text: string;
    }
  >;
  topNavColor: string;
  topNavColorChange: Action<ThemeModel, string>;
  visibleAppBar: boolean;
  visibleAppDrawer: boolean;
  visibleBottomNav: boolean;
  visibleStatusBar: boolean;
}

const themeModel: ThemeModel = {
  ...ThemeConfig,

  changeLocale: action((state, payload) => {
    state.locale = payload;
  }),
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
  headerNavColorChange: action((state, payload) => {
    state.headerNavColor = payload;
  }),
  navTypeChange: action((state, payload) => {
    state.navType = payload;
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
  sideNavStyleChange: action((state, payload) => {
    state.sideNavTheme = payload;
  }),
  switchTheme: action((state, payload) => {
    typedLocalStorage.set(LocalStorageKeys.theme, payload);
    state.currentTheme = payload;
  }),
  toggleAppDrawer: action((state) => {
    state.visibleAppDrawer = !state.visibleStatusBar;
  }),
  toggleCollapsedNav: action((state, payload) => {
    state.navCollapsed = payload;
  }),
  toggleLightBox: action((state, payload) => {
    state.lightbox = !state.lightbox;
    state.lightboxImages = payload.images;
    state.lightboxIndex = payload.index;
  }),
  toggleMobileNav: action((state) => {
    state.mobileNav = !state.mobileNav;
  }),
  toggleNotificationBar: action((state, payload) => {
    state.notification = payload.status;
    state.notificationBottom = payload.bottom;
    state.notificationText = payload.text;
  }),
  topNavColorChange: action((state, payload) => {
    state.topNavColor = payload;
  }),
};

export default themeModel;
