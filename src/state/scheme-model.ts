/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';

import { action } from 'easy-peasy';
import { GoodsMode } from 'graphql/types';

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

export interface SetSchemePayload {
  activityAssignToUser: boolean;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  autoPopulateDescription: boolean;
  connectedToSchemes: {
    id: string;
    name: string;
  }[];
  darkLogo?: null | string | undefined;
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
  logo?: null | string | undefined;
  name: string;
  needJustification: boolean;
  oneSelectedIncidentTypeOnly: boolean;
  reportOnly: boolean;
  requireSiteNumberForUsers: boolean;
  restrictIncidentAccess: boolean;
  taskTimeTracking: boolean;
  translations?: Translations[];
  useBusinessGroupsOnIncident: boolean;
  userNotifications?: null | number | undefined;
  userTodos?: null | number | undefined;
}

export interface SchemeModel {
  activityAssignToUser: boolean;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  autoPopulateDescription: boolean;
  clearScheme: Action<SchemeModel>;
  connectedToSchemes: {
    id: string;
    name: string;
  }[];
  darkLogo?: null | string | undefined;
  defaultPublicOffenderDOB: boolean;
  facialDetection: boolean;
  facialRecognition: boolean;
  facialRedaction: boolean;
  goodsMode: GoodsMode;
  hasConnectedSchemes: boolean;
  id: string;
  imagesRequiredOnOffenders: boolean;
  incidentCustomQuestionRadio: boolean;
  incidentTypeTooltip?: null | string | undefined;
  languageCount: number;
  logo?: null | string | undefined;
  name: string;
  needJustification: boolean;
  oneSelectedIncidentTypeOnly: boolean;
  reportOnly: boolean;
  requireSiteNumberForUsers: boolean;
  restrictIncidentAccess: boolean;
  setScheme: Action<SchemeModel, SetSchemePayload>;
  taskTimeTracking: boolean;
  translations?: Translations[];
  useBusinessGroupsOnIncident: boolean;
  userNotifications?: null | number | undefined;
  userTodos?: null | number | undefined;
}

const userModel: SchemeModel = {
  activityAssignToUser: false,
  autoApproveIncidents: false,
  autoApproveOffenders: false,
  autoPopulateDescription: true,
  clearScheme: action((state) => {
    state.id = '';
    state.autoApproveIncidents = false;
    state.autoApproveOffenders = false;
    state.restrictIncidentAccess = false;
    state.reportOnly = false;
    state.defaultPublicOffenderDOB = false;
    state.name = '';
    state.logo = '';
    state.darkLogo = '';
    state.userTodos = 0;
    state.userNotifications = 0;
    state.translations = [];
    state.goodsMode = GoodsMode.Generic;
    state.facialRecognition = false;
    state.activityAssignToUser = false;
    state.useBusinessGroupsOnIncident = false;
    state.imagesRequiredOnOffenders = false;
    state.taskTimeTracking = false;
    state.languageCount = 0;
    state.autoPopulateDescription = true;
    state.needJustification = false;
    state.requireSiteNumberForUsers = false;
    state.oneSelectedIncidentTypeOnly = false;
    state.facialDetection = false;
    state.facialRedaction = false;
    state.connectedToSchemes = [];
    state.hasConnectedSchemes = false;
    state.incidentCustomQuestionRadio = false;
    state.incidentTypeTooltip = '';
  }),
  connectedToSchemes: [],
  darkLogo: '',
  defaultPublicOffenderDOB: false,
  facialDetection: false,
  facialRecognition: false,
  facialRedaction: false,
  goodsMode: GoodsMode.Generic,
  hasConnectedSchemes: false,
  id: '',
  imagesRequiredOnOffenders: false,
  incidentCustomQuestionRadio: false,
  incidentTypeTooltip: '',
  languageCount: 0,
  logo: '',
  name: 'Loading...',
  needJustification: false,
  oneSelectedIncidentTypeOnly: false,
  reportOnly: false,
  requireSiteNumberForUsers: false,
  restrictIncidentAccess: false,
  setScheme: action((state, payload) => {
    state.id = payload.id;
    state.autoApproveIncidents = payload.autoApproveIncidents;
    state.autoApproveOffenders = payload.autoApproveOffenders;
    state.restrictIncidentAccess = payload.restrictIncidentAccess;
    state.reportOnly = payload.reportOnly;
    state.defaultPublicOffenderDOB = payload.defaultPublicOffenderDOB;
    state.name = payload.name;
    state.logo = payload.logo;
    state.darkLogo = payload.darkLogo;
    state.userTodos = payload.userTodos;
    state.userNotifications = payload.userNotifications;
    state.translations = payload.translations;
    state.goodsMode = payload.goodsMode;
    state.facialRecognition = payload.facialRecognition;
    state.imagesRequiredOnOffenders = payload.imagesRequiredOnOffenders;
    state.activityAssignToUser = payload.activityAssignToUser;
    state.useBusinessGroupsOnIncident = payload.useBusinessGroupsOnIncident;
    state.taskTimeTracking = payload.taskTimeTracking;
    state.languageCount = payload.languageCount;
    state.autoPopulateDescription = payload.autoPopulateDescription;
    state.needJustification = payload.needJustification;
    state.requireSiteNumberForUsers = payload.requireSiteNumberForUsers;
    state.oneSelectedIncidentTypeOnly = payload.oneSelectedIncidentTypeOnly;
    state.facialDetection = payload.facialDetection;
    state.facialRedaction = payload.facialRedaction;
    state.incidentCustomQuestionRadio = payload.incidentCustomQuestionRadio;
    state.incidentTypeTooltip = payload.incidentTypeTooltip;
    state.connectedToSchemes = payload.connectedToSchemes;
    state.hasConnectedSchemes =
      payload.connectedToSchemes && payload.connectedToSchemes.length > 0;
  }),
  taskTimeTracking: false,
  translations: [],
  useBusinessGroupsOnIncident: false,
  userNotifications: 0,
  userTodos: 0,
};

export default userModel;
