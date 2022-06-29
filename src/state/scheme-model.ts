/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface SetSchemePayload {
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  id: string;
}

export interface SchemeModel {
  id: string;
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  setScheme: Action<SchemeModel, SetSchemePayload>;
  clearScheme: Action<SchemeModel>;
}

const userModel: SchemeModel = {
  id: '',
  autoApproveIncidents: false,
  autoApproveOffenders: false,
  name: 'Loading...',

  setScheme: action((state, payload) => {
    state.id = payload.id;
    state.autoApproveIncidents = payload.autoApproveIncidents;
    state.autoApproveOffenders = payload.autoApproveOffenders;
    state.name = payload.name
  }),
  clearScheme: action((state) => {
    state.id = ''
    state.autoApproveIncidents = false
    state.autoApproveOffenders = false
    state.name = ''
  })
};

export default userModel;
