/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';
import type RGL from 'react-grid-layout';

export type DashboardLayout = {
  layout: (RGL.Layout & {
    i: AvailableDashboardElements;
  })[];
  marquee: string | null;
};

export interface SchemeDashboardLayouts {
  [schemeId: string]: DashboardLayout;
}

export const defaultUserLayout: DashboardLayout = {
  layout: [
    {
      w: 12,
      h: 2,
      x: 0,
      y: 0,
      i: 'searchRow',
      moved: false,
      static: true,
    },
    {
      w: 4,
      h: 24,
      x: 0,
      y: 2,
      i: 'feedItemCol',
      minW: 4,
      minH: 4,
      moved: false,
      static: true,
    },
    {
      w: 8,
      h: 19,
      x: 4,
      y: 7,
      i: 'articlesSection',
      minW: 3,
      minH: 4,
      moved: false,
      static: true,
    },
    {
      w: 8,
      h: 5,
      x: 4,
      y: 2,
      i: 'activeOffender',
      minW: 4,
      minH: 4,
      moved: false,
      static: true,
    },
  ],
  marquee: null,
};
export const defaultAdminLayout: DashboardLayout = {
  layout: [
    {
      w: 12,
      h: 2,
      x: 0,
      y: 0,
      i: 'searchRow',
      moved: false,
      static: true,
    },
    {
      w: 4,
      h: 24,
      x: 0,
      y: 2,
      i: 'feedItemCol',
      minW: 4,
      minH: 4,
      moved: false,
      static: true,
    },
    {
      w: 5,
      h: 19,
      x: 4,
      y: 7,
      i: 'adminTodos',
      minW: 4,
      minH: 4,
      moved: false,
      static: true,
    },
    {
      w: 3,
      h: 19,
      x: 9,
      y: 7,
      i: 'articlesSection',
      minW: 3,
      minH: 4,
      moved: false,
      static: true,
    },
    {
      w: 8,
      h: 5,
      x: 4,
      y: 2,
      i: 'activeOffender',
      minW: 4,
      minH: 4,
      moved: false,
      static: true,
    },
  ],
  marquee: null,
};

export interface DashboardModel {
  startDate: Date;
  endDate: Date;
  isSet: boolean;
  initialLayout: DashboardLayout;
  schemeLayouts: SchemeDashboardLayouts;
  setStartDate: Action<DashboardModel, Date>;
  setEndDate: Action<DashboardModel, Date>;
  setSchemeLayouts: Action<DashboardModel, SchemeDashboardLayouts>;
}

const dashboardModel: DashboardModel = {
  startDate: new Date(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 59)
  ),
  endDate: new Date(new Date().setHours(23, 59, 59, 999)),
  isSet: false,
  initialLayout: defaultUserLayout,
  schemeLayouts: {},

  setSchemeLayouts: action((state, payload) => {
    state.schemeLayouts = payload;
    state.isSet = true;
  }),
  setStartDate: action((state, payload) => {
    state.startDate = payload;
  }),
  setEndDate: action((state, payload) => {
    state.endDate = payload;
  }),
};

export default dashboardModel;

export type AvailableDashboardElements =
  | 'feedItemCol'
  | 'adminTodos'
  | 'articlesSection'
  | 'searchRow'
  | 'activeOffender'
  | 'dayOfWeekBar'
  | 'timeOfDayBar'
  | 'incidentCount'
  | 'latestIncident'
  | 'incidentValue'
  | 'targetedGoods'
  | 'latestIncidents';
