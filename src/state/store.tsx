import type { ReactNode } from 'react';

import { StoreProvider, createStore, createTypedHooks } from 'easy-peasy';
import React from 'react';

import type { AuthModel } from './auth-model';
import type { DashboardModel } from './dashboard-model';
import type { DataModel } from './data-model';
import type { FilterModel } from './filter-model';
import type { SchemeModel } from './scheme-model';
import type { ThemeModel } from './theme-model';
import type { UserModel } from './user-model';

import authModel from './auth-model';
import dashboardModel from './dashboard-model';
import dataModel from './data-model';
import filterModel from './filter-model';
import schemeModel from './scheme-model';
import themeModel from './theme-model';
import userModel from './user-model';

interface StoreModel {
  auth: AuthModel;
  dashboard: DashboardModel;
  data: DataModel;
  filter: FilterModel;
  scheme: SchemeModel;
  theme: ThemeModel;
  user: UserModel;
}

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;

interface GlobalStoreProps {
  children: ReactNode;
}
export const storeModel: StoreModel = {
  auth: authModel,
  dashboard: dashboardModel,
  data: dataModel,
  filter: filterModel,
  scheme: schemeModel,
  theme: themeModel,
  user: userModel,
};

export const Store = ({ children }: GlobalStoreProps): JSX.Element => {
  const store = createStore(storeModel);

  return <StoreProvider store={store}>{children}</StoreProvider>;
};
