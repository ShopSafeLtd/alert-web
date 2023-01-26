/* eslint-disable no-param-reassign */
import { action, Action } from 'easy-peasy';
import { Role } from 'graphql/generated';

export interface SetUserPayload {
  id: string;
  email: string;
  fullName: string;
  onboarded: boolean;
  organisation: string;
  schemes: Scheme[];
  groups: {
    id: string;
    name: string;
  }[];
  isSet: boolean;
}

export interface SetUserRole {
  role: Role;
}

export interface Scheme {
  id: string;
  role: Role;
  scheme: {
    id: string;
    name: string;
    autoApproveIncidents: boolean;
    autoApproveOffenders: boolean;
  };
}

export interface UserModel {
  id: string;
  email: string;
  fullName: string;
  picture: string;
  organisation: string;
  onboarded: boolean;
  schemes: Scheme[];
  groups: {
    id: string;
    name: string;
  }[];
  role: Role;
  isSet: boolean;
  setUser: Action<UserModel, SetUserPayload>;
  setRole: Action<UserModel, SetUserRole>;
  clearUser: Action<UserModel>;
}

const userModel: UserModel = {
  id: '',
  email: '',
  fullName: '',
  picture: '',
  organisation: '',
  onboarded: false,
  isSet: false,
  role: Role.User,
  schemes: [],
  groups: [],

  setUser: action((state, payload) => {
    state.id = payload.id;
    state.email = payload.email;
    state.fullName = payload.fullName;
    state.onboarded = payload.onboarded;
    state.organisation = payload.organisation;
    state.schemes = payload.schemes;
    state.groups = payload.groups;
    state.isSet = payload.isSet;
  }),
  setRole: action((state, payload) => {
    state.role = payload.role;
  }),
  clearUser: action((state) => {
    state.id = '';
    state.email = '';
    state.fullName = '';
    state.picture = '';
    state.organisation = '';
    state.onboarded = false;
    state.schemes = [];
    state.role = Role.User;
    state.isSet = false;
  }),
};

export default userModel;
