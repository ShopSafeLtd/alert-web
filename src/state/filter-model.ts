/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';
import { ChecklistStatus } from 'graphql/types';

export interface SetFilterModel {
  groups: string[];
}

export type ChecklistSortOptions = 'createdAt' | 'title';
export type ChecklistSortOrder = 'asc' | 'desc';
export type ActiveChecklistSortOptions =
  | 'createdAt'
  | 'completedAt'
  | 'percentComplete'
  | 'status'
  | 'name';

export interface FilterModelValues {
  businesses: string[];
  ownUser: boolean;
  checklistsTab: string;
  activeStatus?: (ChecklistStatus.InProgress | ChecklistStatus.Completed)[];
}
export interface SetChecklistFilterModel {
  businesses?: string[];
  ownUser?: boolean;
  checklistsTab?: string;
  activeStatus?: (ChecklistStatus.InProgress | ChecklistStatus.Completed)[];
}

export interface FilterModel {
  groups: string[];
  checklistFilter: FilterModelValues;
  checklistSort: {
    field: ChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  setChecklistSort: Action<
    FilterModel,
    { field: ChecklistSortOptions; order: ChecklistSortOrder }
  >;
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  setActiveChecklistSort: Action<
    FilterModel,
    { field: ActiveChecklistSortOptions; order: ChecklistSortOrder }
  >;
  setChecklistFilters: Action<FilterModel, SetChecklistFilterModel>;
  setFilter: Action<FilterModel, SetFilterModel>;
  clearFilter: Action<FilterModel>;
}

const filterModel: FilterModel = {
  groups: [],
  checklistFilter: {
    checklistsTab: 'Checklists',
    businesses: [],
    ownUser: false,
    activeStatus: [ChecklistStatus.InProgress, ChecklistStatus.Completed],
  },
  checklistSort: {
    field: 'createdAt',
    order: 'desc',
  },
  activeChecklistSort: {
    field: 'createdAt',
    order: 'desc',
  },
  setChecklistSort: action((state, payload) => {
    state.checklistSort = payload;
  }),
  setActiveChecklistSort: action((state, payload) => {
    state.activeChecklistSort = payload;
  }),
  setChecklistFilters: action((state, payload) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(payload)) {
      if (payload[key] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.checklistFilter[key] = payload[key];
      }
    }
  }),
  setFilter: action((state, payload) => {
    state.groups = payload.groups;
  }),

  clearFilter: action((state) => {
    state.groups = [];
    state.checklistFilter = {
      checklistsTab: 'Checklists',
      businesses: [],
      ownUser: false,
      activeStatus: [ChecklistStatus.InProgress, ChecklistStatus.Completed],
    };
    state.activeChecklistSort = {
      field: 'createdAt',
      order: 'desc',
    };
    state.checklistSort = {
      field: 'createdAt',
      order: 'desc',
    };
  }),
};

export default filterModel;
