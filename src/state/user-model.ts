/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';
import type {
  GoodsMode,
  PermissionMethod,
  PermissionModel,
} from 'graphql/generated';
import { Role } from 'graphql/generated';
import type { Translations } from './scheme-model';

export interface SetUserPayload {
  id: string;
  email: string;
  fullName: string;
  origName: string;
  reference: string;
  onboarded: boolean;
  reportToAllBusinesses: boolean;
  businesses: {
    name: string;
    fullName: string;
    id: string;
    demId?: string | null | undefined;
    brands: string[];
  }[];
  schemes: Scheme[];
  demId: string | null | undefined;
  // groups: {
  //   id: string;
  //   name: string;
  //   scheme: {
  //     id: string;
  //   };
  // }[];
  defaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  filterDefaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  isSet: boolean;
  userNotifications: number;
  userMessages: number;
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
  model: PermissionModel;
  allowedMethods: PermissionMethod[];
}

export interface Scheme {
  id: string;
  role: Role;
  permissions: Permissions[];
  scheme: {
    id: string;
    name: string;
    autoApproveIncidents: boolean;
    autoApproveOffenders: boolean;
    restrictIncidentAccess: boolean;
    reportOnly: boolean;
    defaultPublicOffenderDOB: boolean;
    userTodos?: number | null | undefined;
    userNotifications?: number | null | undefined;
    userMessages?: number | null | undefined;
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
    facialDetection: boolean;
    taskTimeTracking: boolean;
    imagesRequiredOnOffenders: boolean;
    autoPopulateDescription: boolean;
    needJustification: boolean;
    requireSiteNumberForUsers: boolean;
    oneSelectedIncidentTypeOnly: boolean;
    connectedToSchemes: {
      id: string;
      name: string;
    }[];
  };
}

export interface UserModel {
  id: string;
  email: string;
  fullName: string;
  origName: string;
  reference: string;
  picture: string;
  sessionId: string | null;
  dem: { id: string; name: string }[];
  businesses: {
    name: string;
    fullName: string;
    id: string;
    demId?: string | null | undefined;
    brands: string[];
    // locations: {
    //   geoLng:float
    //   geoLat:float
    // }
  }[];
  onboarded: boolean;
  reportToAllBusinesses: boolean;
  schemes: Scheme[];
  demId: string | null | undefined;
  userTodos?: number | null | undefined;
  userNotifications?: number | null | undefined;
  userMessages?: number | null | undefined;
  defaultGroups: {
    id: string;
    name: string;
    scheme: {
      id: string;
    };
  }[];
  filterDefaultGroups: {
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
  setFilterDefaultGroup: Action<UserModel, SetFilterDefaultGroup>;
  setTodos: Action<UserModel, SetUserTodos>;
  setInvestigationAllSchemes: Action<UserModel, SetInvestigationAllSchemes>;
  setNotifications: Action<UserModel, SetUserNotifications>;
  setMessages: Action<UserModel, SetUserMessages>;
  clearUser: Action<UserModel>;
  setDem: Action<UserModel, SetDemPayload>;
  setSession: Action<UserModel, string>;
}

const userModel: UserModel = {
  id: '',
  email: '',
  fullName: '',
  origName: '',
  reference: '',
  picture: '',
  businesses: [],
  sessionId: null,
  onboarded: false,
  isSet: false,
  role: Role.User,
  schemes: [],
  defaultGroups: [],
  filterDefaultGroups: [],
  reportToAllBusinesses: false,

  demId: '',
  userTodos: 0,
  userNotifications: 0,
  userMessages: 0,
  investigationAllSchemes: false,
  dem: [],
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
  }),
  setFilterDefaultGroup: action((state, payload) => {
    state.filterDefaultGroups = payload.filterDefaultGroups;
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
  setMessages: action((state, payload) => {
    state.userMessages = payload.userMessages;
  }),
  setInvestigationAllSchemes: action((state, payload) => {
    state.investigationAllSchemes = payload.investigationAllSchemes;
  }),
  setDem: action((state, payload) => {
    state.dem = payload.dem;
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
    state.dem = [];
    state.reportToAllBusinesses = false;
    state.sessionId = null;
  }),
  setSession: action((state, payload) => {
    state.sessionId = payload;
  }),
};

export default userModel;
