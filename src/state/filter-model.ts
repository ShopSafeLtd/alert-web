/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';

export interface SetFilterModel {
  groups: string[];
}

export interface FilterModel {
  groups: string[];
  setFilter: Action<FilterModel, SetFilterModel>;
  clearFilter: Action<FilterModel>;
}

const filterModel: FilterModel = {
  groups: [],
  setFilter: action((state, payload) => {
    state.groups = payload.groups;
  }),
  clearFilter: action((state) => {
    state.groups = [];
  }),
};

export default filterModel;
