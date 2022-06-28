/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface AuthModel {
  isSet: boolean;
  loading: boolean;
  message: string;
  showMessage: boolean;
  redirect: string;
  token: string | null;
  loggedIn: boolean;

  authenticated: Action<AuthModel, string>;
  setAuthMessage: Action<AuthModel, string>;
  hideAuthMessage: Action<AuthModel>;
  signOut: Action<AuthModel>;
  signUp: Action<AuthModel, string>;
  showLoading: Action<AuthModel>;
  expired: Action<AuthModel>
}

const authModel: AuthModel = {
  isSet: false,
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  token: null,
  loggedIn: false,

  authenticated: action((state, payload) => {
    state.isSet = true;
    state.loading = false;
    state.loggedIn = true;
    state.redirect = "/";
    state.token = payload;
  }),
  setAuthMessage: action((state, payload) => {
    state.message = payload;
    state.showMessage = true;
    state.loading = false;
  }),
  hideAuthMessage: action((state) => {
    state.message = "";
    state.showMessage = false;
  }),
  signOut: action((state) => {
    state.loggedIn = false;
    state.token = null;
    state.redirect = "/";
    state.loading = false;
  }),
  signUp: action((state, payload) => {
    state.loading = false;
    state.loggedIn = false;
    state.token = payload;
  }),
  showLoading: action((state) => {
    state.loading = true;
  }),
  expired: action((state) => {
    state.loading = false;
    state.isSet = true;
  }),
};

export default authModel;
