/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';
import type { GoodsMode } from 'graphql/generated';
import { Role } from 'graphql/generated';
import type { Translations } from './scheme-model';

export interface SetUserPayload {
  id: string;
  email: string;
  fullName: string;
  origName: string;
  reference: string;
  onboarded: boolean;
  businesses: {
    name: string;
    fullName: string;
    id: string;
    demId?: string | null | undefined;
  }[];
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
  userNotifications: number;
}

export interface SetUserRole {
  role: Role;
}

export interface SetUserTodos {
  userTodos: number;
}

export interface SetUserNotifications {
  userNotifications: number;
}
export interface SetInvestigationAllSchemes {
  investigationAllSchemes: boolean;
}

export interface Scheme {
  id: string;
  role: Role;

  scheme: {
    id: string;
    name: string;
    autoApproveIncidents: boolean;
    autoApproveOffenders: boolean;
    restrictIncidentAccess: boolean;
    defaultPublicOffenderDOB: boolean;
    userTodos?: number | null | undefined;
    userNotifications?: number | null | undefined;
    customTranslations?: Translations[];
    languageCount: number;
    logo?:
      | {
          optimisedPersisted?: string | null | undefined;
        }
      | null
      | undefined;
    darkLogo?:
      | {
          optimisedPersisted?: string | null | undefined;
        }
      | null
      | undefined;
    goodsMode: GoodsMode;
    facialRecognition: boolean;
    taskTimeTracking: boolean;
    imagesRequiredOnOffenders: boolean;
    autoPopulateDescription: boolean;
  };
}

export interface UserModel {
  id: string;
  email: string;
  fullName: string;
  origName: string;
  reference: string;
  picture: string;
  businesses: {
    name: string;
    fullName: string;
    id: string;
    demId?: string | null | undefined;
  }[];
  onboarded: boolean;
  schemes: Scheme[];
  demId: string | null | undefined;
  userTodos?: number | null | undefined;
  userNotifications?: number | null | undefined;
  groups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  role: Role;
  isSet: boolean;
  investigationAllSchemes: boolean;
  setUser: Action<UserModel, SetUserPayload>;
  setRole: Action<UserModel, SetUserRole>;
  setTodos: Action<UserModel, SetUserTodos>;
  setInvestigationAllSchemes: Action<UserModel, SetInvestigationAllSchemes>;
  setNotifications: Action<UserModel, SetUserNotifications>;
  clearUser: Action<UserModel>;
}

const userModel: UserModel = {
  id: '',
  email: '',
  fullName: '',
  origName: '',
  reference: '',
  picture: '',
  businesses: [],
  onboarded: false,
  isSet: false,
  role: Role.User,
  schemes: [],
  groups: [],
  demId: '',
  userTodos: 0,
  userNotifications: 0,
  investigationAllSchemes: false,
  setUser: action((state, payload) => {
    state.id = payload.id;
    state.email = payload.email;
    state.fullName = payload.fullName;
    state.origName = payload.origName;
    state.onboarded = payload.onboarded;
    state.businesses = payload.businesses;
    state.schemes = payload.schemes;
    state.groups = payload.groups;
    state.isSet = payload.isSet;
    state.demId = payload.demId;
    state.reference = payload.reference;
    state.userNotifications = payload.userNotifications;
  }),
  setRole: action((state, payload) => {
    state.role = payload.role;
  }),
  setTodos: action((state, payload) => {
    state.userTodos = payload.userTodos;
  }),
  setNotifications: action((state, payload) => {
    state.userNotifications = payload.userNotifications;
  }),
  setInvestigationAllSchemes: action((state, payload) => {
    state.investigationAllSchemes = payload.investigationAllSchemes;
  }),
  clearUser: action((state) => {
    state.id = '';
    state.email = '';
    state.fullName = '';
    state.origName = '';
    state.picture = '';
    state.businesses = [];
    state.onboarded = false;
    state.schemes = [];
    state.role = Role.User;
    state.isSet = false;
    state.demId = '';
    state.userTodos = 0;
    state.userNotifications = 0;
    state.investigationAllSchemes = false;
  }),
};

export default userModel;
