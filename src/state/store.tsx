import type { ReactNode } from 'react';
import React from 'react';
import { createStore, StoreProvider, createTypedHooks } from 'easy-peasy';

import type { AuthModel } from './auth-model';
import authModel from './auth-model';
import type { ThemeModel } from './theme-model';
import themeModel from './theme-model';
import type { UserModel } from './user-model';
import userModel from './user-model';
import type { SchemeModel } from './scheme-model';
import schemeModel from './scheme-model';
import type { DataModel } from './data-model';
import dataModel from './data-model';
// import type { FilterModel } from './filter-model';
// import filterModel from './filter-model';

interface StoreModel {
  auth: AuthModel;
  theme: ThemeModel;
  user: UserModel;
  scheme: SchemeModel;
  data: DataModel;
  // filter: FilterModel;
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
  theme: themeModel,
  user: userModel,
  scheme: schemeModel,
  data: dataModel,
  // filter: filterModel,
};
export const Store = ({ children }: GlobalStoreProps): JSX.Element => {
  const store = createStore(storeModel);

  return <StoreProvider store={store}>{children}</StoreProvider>;
};
