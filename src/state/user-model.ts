/* eslint-disable no-param-reassign */
import { action, Action } from 'easy-peasy';
import { Role } from 'graphql/generated';

export interface SetUserPayload {
  id: string;
  email: string;
  fullName: string;
  reference: string;
  onboarded: boolean;
  businesses: { name: string; id: string; demId?: string | null | undefined }[];
  schemes: Scheme[];
  demId: string | null | undefined;
  groups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
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
  reference: string;
  picture: string;
  businesses: { name: string; id: string; demId?: string | null | undefined }[];
  onboarded: boolean;
  schemes: Scheme[];
  demId: string | null | undefined;

  groups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
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
  reference: '',
  picture: '',
  businesses: [],
  onboarded: false,
  isSet: false,
  role: Role.User,
  schemes: [],
  groups: [],
  demId: '',

  setUser: action((state, payload) => {
    state.id = payload.id;
    state.email = payload.email;
    state.fullName = payload.fullName;
    state.onboarded = payload.onboarded;
    state.businesses = payload.businesses;
    state.schemes = payload.schemes;
    state.groups = payload.groups;
    state.isSet = payload.isSet;
    state.demId = payload.demId;
    state.reference = payload.reference;
  }),
  setRole: action((state, payload) => {
    state.role = payload.role;
  }),
  clearUser: action((state) => {
    state.id = '';
    state.email = '';
    state.fullName = '';
    state.picture = '';
    state.businesses = [];
    state.onboarded = false;
    state.schemes = [];
    state.role = Role.User;
    state.isSet = false;
    state.demId = '';
  }),
};

export default userModel;
