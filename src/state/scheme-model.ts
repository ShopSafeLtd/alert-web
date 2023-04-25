/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';

export interface SetSchemePayload {
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  defaultPublicOffenderDOB: boolean;
  id: string;
  logo?: string | null | undefined;
  darkLogo?: string | null | undefined;
}

export interface SchemeModel {
  id: string;
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  defaultPublicOffenderDOB: boolean;
  setScheme: Action<SchemeModel, SetSchemePayload>;
  clearScheme: Action<SchemeModel>;
  logo?: string | null | undefined;
  darkLogo?: string | null | undefined;
}

const userModel: SchemeModel = {
  id: '',
  autoApproveIncidents: false,
  autoApproveOffenders: false,
  defaultPublicOffenderDOB: false,
  name: 'Loading...',
  logo: '',
  darkLogo: '',

  setScheme: action((state, payload) => {
    state.id = payload.id;
    state.autoApproveIncidents = payload.autoApproveIncidents;
    state.autoApproveOffenders = payload.autoApproveOffenders;
    state.defaultPublicOffenderDOB = payload.defaultPublicOffenderDOB;
    state.name = payload.name;
    state.logo = payload.logo;
    state.darkLogo = payload.darkLogo;
  }),
  clearScheme: action((state) => {
    state.id = '';
    state.autoApproveIncidents = false;
    state.autoApproveOffenders = false;
    state.defaultPublicOffenderDOB = false;
    state.name = '';
    state.logo = '';
    state.darkLogo = '';
  }),
};

export default userModel;
