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
  | 'completedAt'
  | 'createdAt'
  | 'name'
  | 'percentComplete'
  | 'status';

export interface FilterModelValues {
  activeStatus?: (ChecklistStatus.Completed | ChecklistStatus.InProgress)[];
  businesses: string[];
  completedBy: string[];
  pageIndex: number;
  pageSize: number;
  searchValue: string;
  templates: string[];
}
export interface SetChecklistFilterModel {
  activeStatus?: (ChecklistStatus.Completed | ChecklistStatus.InProgress)[];
  businesses?: string[];
  completedBy?: string[];
  pageIndex?: number;
  pageSize?: number;
  searchValue?: string;
  templates?: string[];
}

export interface FilterModel {
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  checklistFilter: FilterModelValues;
  checklistSort: {
    field: ChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  clearFilter: Action<FilterModel>;
  groups: string[];
  setActiveChecklistSort: Action<
    FilterModel,
    { field: ActiveChecklistSortOptions; order: ChecklistSortOrder }
  >;
  setChecklistFilters: Action<FilterModel, SetChecklistFilterModel>;
  setChecklistSort: Action<
    FilterModel,
    { field: ChecklistSortOptions; order: ChecklistSortOrder }
  >;
  setFilter: Action<FilterModel, SetFilterModel>;
}

const filterModel: FilterModel = {
  activeChecklistSort: {
    field: 'createdAt',
    order: 'desc',
  },
  checklistFilter: {
    activeStatus: [ChecklistStatus.InProgress, ChecklistStatus.Completed],
    businesses: [],
    completedBy: [],
    pageIndex: 0,
    pageSize: 25,
    searchValue: '',
    templates: [],
  },
  checklistSort: {
    field: 'createdAt',
    order: 'desc',
  },
  clearFilter: action((state) => {
    state.groups = [];
    state.checklistFilter = {
      activeStatus: [ChecklistStatus.InProgress, ChecklistStatus.Completed],
      businesses: [],
      completedBy: [],
      pageIndex: 0,
      pageSize: 25,
      searchValue: '',
      templates: [],
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
  groups: [],
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
  setChecklistSort: action((state, payload) => {
    state.checklistSort = payload;
  }),

  setFilter: action((state, payload) => {
    state.groups = payload.groups;
  }),
};

export default filterModel;
