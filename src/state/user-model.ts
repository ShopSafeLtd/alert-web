import { action, Action } from "easy-peasy";
import { Role } from "graphql-src/users/enums";

export interface SetUserPayload {
  id: string;
  email: string;
  fullName: string;
  onboarded: boolean;
  organisation: string;
  schemes: Scheme[];
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
  }
}

export interface UserModel {
  id: string;
  email: string;
  fullName: string;
  picture: string;
  organisation: string;
  onboarded: boolean;
  schemes: Scheme[];
  role: Role;
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
  role: Role.USER,
  schemes: [],

  setUser: action((state, payload) => {
      state.id = payload.id;
      state.email = payload.email;
      state.fullName = payload.fullName;
      state.onboarded = payload.onboarded;
      state.organisation = payload.organisation;
      state.schemes = payload.schemes;
  }),
  setRole: action((state, payload) => {
    state.role = payload.role;
  }),
  clearUser: action((state) => {
    state.id = '';
    state.email = '';
    state.fullName = ''
    state.onboarded = false;
    state.organisation = '';
  }),
};

export default userModel;
