/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import type {
  GoodsMode,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';

import { action } from 'easy-peasy';
import { Role } from 'graphql/types';

import type { Translations } from './scheme-model';

export interface SetUserPayload {
  businesses: {
    brands: string[];
    demId?: null | string | undefined;
    fullName: string;
    id: string;
    name: string;
  }[];
  // }[];
  defaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  demId: null | string | undefined;
  email: string;
  filterDefaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  forcePasswordReset: boolean;
  fullName: string;
  hasPassword: boolean;
  id: string;
  isSet: boolean;
  onboarded: boolean;
  origName: string;
  // groups: {
  //   id: string;
  //   name: string;
  //   scheme: {
  //     id: string;
  //   };
  reference: string;
  reportToAllBusinesses: boolean;
  schemes: Scheme[];
  termsExpired: boolean;
  userMessages: number;
  userNotifications: number;
}

export interface SetDemPayload {
  dem: { id: string; name: string }[];
}
export interface SetFilterDefaultGroup {
  filterDefaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
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
export interface SetUserMessages {
  userMessages: number;
}
export interface SetInvestigationAllSchemes {
  investigationAllSchemes: boolean;
}

export interface Permissions {
  allowedMethods: PermissionMethod[];
  model: PermissionModel;
}

export interface Scheme {
  id: string;
  permissions: Permissions[];
  role: Role;
  scheme: {
    activityAssignToUser: boolean;
    autoApproveIncidents: boolean;
    autoApproveOffenders: boolean;
    autoPopulateDescription: boolean;
    connectedToSchemes: {
      id: string;
      name: string;
    }[];
    customTranslations?: Translations[];
    darkLogo?:
      | {
          optimisedPersisted?: null | string | undefined;
        }
      | null
      | undefined;
    defaultPublicOffenderDOB: boolean;
    facialDetection: boolean;
    facialRecognition: boolean;
    facialRedaction: boolean;
    goodsMode: GoodsMode;
    id: string;
    imagesRequiredOnOffenders: boolean;
    incidentCustomQuestionRadio: boolean;
    incidentTypeTooltip?: null | string | undefined;
    languageCount: number;
    logo?:
      | {
          optimisedPersisted?: null | string | undefined;
        }
      | null
      | undefined;
    name: string;
    needJustification: boolean;
    oneSelectedIncidentTypeOnly: boolean;
    reportOnly: boolean;
    requireSiteNumberForUsers: boolean;
    restrictIncidentAccess: boolean;
    taskTimeTracking: boolean;
    useBusinessGroupsOnIncident: boolean;
    userMessages?: null | number | undefined;
    userNotifications?: null | number | undefined;
    userTodos?: null | number | undefined;
  };
}

export interface UserModel {
  businesses: {
    brands: string[];
    demId?: null | string | undefined;
    fullName: string;
    id: string;
    name: string;
    // locations: {
    //   geoLng:float
    //   geoLat:float
    // }
  }[];
  clearUser: Action<UserModel>;
  defaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  dem: { id: string; name: string }[];
  demId: null | string | undefined;
  email: string;
  filterDefaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  forcePasswordReset: boolean;
  fullName: string;
  hasPassword: boolean;
  id: string;
  investigationAllSchemes: boolean;
  isSet: boolean;
  onboarded: boolean;
  origName: string;
  picture: string;
  reference: string;
  reportToAllBusinesses: boolean;
  role: Role;
  schemes: Scheme[];
  sessionId: null | string;
  setDem: Action<UserModel, SetDemPayload>;
  setFilterDefaultGroup: Action<UserModel, SetFilterDefaultGroup>;
  setInvestigationAllSchemes: Action<UserModel, SetInvestigationAllSchemes>;
  setMessages: Action<UserModel, SetUserMessages>;
  setNotifications: Action<UserModel, SetUserNotifications>;
  setPasswordSet: Action<UserModel>;
  setRole: Action<UserModel, SetUserRole>;
  setSession: Action<UserModel, string>;
  setTodos: Action<UserModel, SetUserTodos>;
  setUser: Action<UserModel, SetUserPayload>;
  termsExpired: boolean;
  userMessages?: null | number | undefined;
  userNotifications?: null | number | undefined;
  userOnboarded: Action<UserModel>;
  userTodos?: null | number | undefined;
}

const userModel: UserModel = {
  businesses: [],
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
    state.dem = [];
    state.reportToAllBusinesses = false;
    state.sessionId = null;
  }),
  defaultGroups: [],
  dem: [],
  demId: '',
  email: '',
  filterDefaultGroups: [],
  forcePasswordReset: false,
  fullName: '',
  hasPassword: false,
  id: '',
  investigationAllSchemes: false,
  isSet: false,
  onboarded: false,
  origName: '',
  picture: '',
  reference: '',
  reportToAllBusinesses: false,
  role: Role.User,
  schemes: [],
  sessionId: null,
  setDem: action((state, payload) => {
    state.dem = payload.dem;
  }),
  setFilterDefaultGroup: action((state, payload) => {
    state.filterDefaultGroups = payload.filterDefaultGroups;
  }),
  setInvestigationAllSchemes: action((state, payload) => {
    state.investigationAllSchemes = payload.investigationAllSchemes;
  }),
  setMessages: action((state, payload) => {
    state.userMessages = payload.userMessages;
  }),
  setNotifications: action((state, payload) => {
    state.userNotifications = payload.userNotifications;
  }),
  setPasswordSet: action((state) => {
    state.forcePasswordReset = false;
    state.hasPassword = true;
  }),
  setRole: action((state, payload) => {
    state.role = payload.role;
  }),
  setSession: action((state, payload) => {
    state.sessionId = payload;
  }),
  setTodos: action((state, payload) => {
    state.userTodos = payload.userTodos;
  }),
  setUser: action((state, payload) => {
    state.id = payload.id;
    state.email = payload.email;
    state.fullName = payload.fullName;
    state.origName = payload.origName;
    state.onboarded = payload.onboarded;
    state.businesses = payload.businesses;
    state.schemes = payload.schemes;
    state.defaultGroups = payload.defaultGroups || [];
    state.filterDefaultGroups = payload.filterDefaultGroups || [];
    state.isSet = payload.isSet;
    state.demId = payload.demId;
    state.reference = payload.reference;
    state.userNotifications = payload.userNotifications;
    state.userMessages = payload.userMessages;
    state.reportToAllBusinesses = payload.reportToAllBusinesses;
    state.forcePasswordReset = payload.forcePasswordReset;
    state.hasPassword = payload.hasPassword;
    state.termsExpired = payload.termsExpired;
  }),
  termsExpired: false,
  userMessages: 0,
  userNotifications: 0,
  userOnboarded: action((state) => {
    state.onboarded = true;
    state.termsExpired = false;
  }),
  userTodos: 0,
};

export default userModel;
