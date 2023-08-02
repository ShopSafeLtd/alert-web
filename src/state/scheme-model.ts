/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';
import { GoodsMode } from '../graphql/generated';

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

export interface SetSchemePayload {
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  defaultPublicOffenderDOB: boolean;
  id: string;
  logo?: string | null | undefined;
  darkLogo?: string | null | undefined;
  userTodos?: number | null | undefined;
  userNotifications?: number | null | undefined;
  translations?: Translations[];
  goodsMode: GoodsMode;
  facialRecognition: boolean;
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
  userTodos?: number | null | undefined;
  userNotifications?: number | null | undefined;
  translations?: Translations[];
  goodsMode: GoodsMode;
  facialRecognition: boolean;
}

const userModel: SchemeModel = {
  id: '',
  autoApproveIncidents: false,
  autoApproveOffenders: false,
  defaultPublicOffenderDOB: false,
  name: 'Loading...',
  logo: '',
  darkLogo: '',
  userTodos: 0,
  userNotifications: 0,
  translations: [],
  goodsMode: GoodsMode.Generic,
  facialRecognition: false,
  setScheme: action((state, payload) => {
    state.id = payload.id;
    state.autoApproveIncidents = payload.autoApproveIncidents;
    state.autoApproveOffenders = payload.autoApproveOffenders;
    state.defaultPublicOffenderDOB = payload.defaultPublicOffenderDOB;
    state.name = payload.name;
    state.logo = payload.logo;
    state.darkLogo = payload.darkLogo;
    state.userTodos = payload.userTodos;
    state.userNotifications = payload.userNotifications;
    state.translations = payload.translations;
    state.goodsMode = payload.goodsMode;
    state.facialRecognition = payload.facialRecognition;
  }),
  clearScheme: action((state) => {
    state.id = '';
    state.autoApproveIncidents = false;
    state.autoApproveOffenders = false;
    state.defaultPublicOffenderDOB = false;
    state.name = '';
    state.logo = '';
    state.darkLogo = '';
    state.userTodos = 0;
    state.userNotifications = 0;
    state.translations = [];
    state.goodsMode = GoodsMode.Generic;
    state.facialRecognition = false;
  }),
};

export default userModel;
