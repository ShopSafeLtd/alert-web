/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import type RGL from 'react-grid-layout';

import { action } from 'easy-peasy';

export type DashboardLayout = {
  layout: ({
    i: AvailableDashboardElements;
  } & RGL.Layout)[];
  marquee: null | string;
};

export interface SchemeDashboardLayouts {
  [schemeId: string]: DashboardLayout;
}

export const defaultUserLayout: DashboardLayout = {
  layout: [
    {
      h: 2,
      i: 'searchRow',
      moved: false,
      static: true,
      w: 12,
      x: 0,
      y: 0,
    },
    {
      h: 24,
      i: 'feedItemCol',
      minH: 4,
      minW: 4,
      moved: false,
      static: true,
      w: 4,
      x: 0,
      y: 2,
    },
    {
      h: 19,
      i: 'articlesSection',
      minH: 4,
      minW: 3,
      moved: false,
      static: true,
      w: 8,
      x: 4,
      y: 7,
    },
    {
      h: 5,
      i: 'activeOffender',
      minH: 4,
      minW: 4,
      moved: false,
      static: true,
      w: 8,
      x: 4,
      y: 2,
    },
  ],
  marquee: null,
};
export const defaultAdminLayout: DashboardLayout = {
  layout: [
    {
      h: 2,
      i: 'searchRow',
      moved: false,
      static: true,
      w: 12,
      x: 0,
      y: 0,
    },
    {
      h: 24,
      i: 'feedItemCol',
      minH: 4,
      minW: 4,
      moved: false,
      static: true,
      w: 4,
      x: 0,
      y: 2,
    },
    {
      h: 19,
      i: 'adminTodos',
      minH: 4,
      minW: 4,
      moved: false,
      static: true,
      w: 5,
      x: 4,
      y: 7,
    },
    {
      h: 19,
      i: 'articlesSection',
      minH: 4,
      minW: 3,
      moved: false,
      static: true,
      w: 3,
      x: 9,
      y: 7,
    },
    {
      h: 5,
      i: 'activeOffender',
      minH: 4,
      minW: 4,
      moved: false,
      static: true,
      w: 8,
      x: 4,
      y: 2,
    },
  ],
  marquee: null,
};

export interface DashboardModel {
  endDate: Date;
  initialLayout: DashboardLayout;
  isSet: boolean;
  schemeLayouts: SchemeDashboardLayouts;
  setEndDate: Action<DashboardModel, Date>;
  setSchemeLayouts: Action<DashboardModel, SchemeDashboardLayouts>;
  setStartDate: Action<DashboardModel, Date>;
  startDate: Date;
}

const dashboardModel: DashboardModel = {
  endDate: new Date(new Date().setHours(23, 59, 59, 999)),
  initialLayout: defaultUserLayout,
  isSet: false,
  schemeLayouts: {},
  setEndDate: action((state, payload) => {
    state.endDate = payload;
  }),

  setSchemeLayouts: action((state, payload) => {
    state.schemeLayouts = payload;
    state.isSet = true;
  }),
  setStartDate: action((state, payload) => {
    state.startDate = payload;
  }),
  startDate: new Date(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 59)
  ),
};

export default dashboardModel;

export type AvailableDashboardElements =
  | 'activeOffender'
  | 'adminTodos'
  | 'articlesSection'
  | 'dayOfWeekBar'
  | 'draftIncidents'
  | 'feedItemCol'
  | 'incidentCount'
  | 'incidentValue'
  | 'latestIncident'
  | 'latestIncidents'
  | 'searchRow'
  | 'targetedGoods'
  | 'timeOfDayBar';
