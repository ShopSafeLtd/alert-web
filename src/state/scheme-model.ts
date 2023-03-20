/* eslint-disable no-param-reassign */
import { action, Action } from 'easy-peasy';

export interface SetSchemePayload {
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  id: string;
  logo?: string | null | undefined;
}

export interface SchemeModel {
  id: string;
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  setScheme: Action<SchemeModel, SetSchemePayload>;
  clearScheme: Action<SchemeModel>;
  logo?: string | null | undefined;
}

const userModel: SchemeModel = {
  id: '',
  autoApproveIncidents: false,
  autoApproveOffenders: false,
  name: 'Loading...',
  logo: '',

  setScheme: action((state, payload) => {
    state.id = payload.id;
    state.autoApproveIncidents = payload.autoApproveIncidents;
    state.autoApproveOffenders = payload.autoApproveOffenders;
    state.name = payload.name;
    state.logo = payload.logo;
  }),
  clearScheme: action((state) => {
    state.id = '';
    state.autoApproveIncidents = false;
    state.autoApproveOffenders = false;
    state.name = '';
    state.logo = '';
  }),
};

export default userModel;
