/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';

import { action } from 'easy-peasy';

export interface AuthModel {
  authenticated: Action<AuthModel, string>;
  expired: Action<AuthModel>;
  hideAuthMessage: Action<AuthModel>;
  isSet: boolean;
  loading: boolean;
  loggedIn: boolean;
  message: string;

  redirect: string;
  setAuthMessage: Action<AuthModel, string>;
  showLoading: Action<AuthModel>;
  showMessage: boolean;
  signOut: Action<AuthModel>;
  signUp: Action<AuthModel, string>;
  token: null | string;
}

const authModel: AuthModel = {
  authenticated: action((state, payload) => {
    state.isSet = true;
    state.loading = false;
    state.loggedIn = true;
    state.redirect = '/';
    state.token = payload;
  }),
  expired: action((state) => {
    state.loading = false;
    state.isSet = true;
  }),
  hideAuthMessage: action((state) => {
    state.message = '';
    state.showMessage = false;
  }),
  isSet: false,
  loading: false,
  loggedIn: false,
  message: '',

  redirect: '',
  setAuthMessage: action((state, payload) => {
    state.message = payload;
    state.showMessage = true;
    state.loading = false;
  }),
  showLoading: action((state) => {
    state.loading = true;
  }),
  showMessage: false,
  signOut: action((state) => {
    state.loggedIn = false;
    state.token = null;
    state.redirect = '/';
    state.loading = false;
  }),
  signUp: action((state, payload) => {
    state.loading = false;
    state.loggedIn = false;
    state.token = payload;
  }),
  token: null,
};

export default authModel;
