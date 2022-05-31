import React, { ReactNode } from 'react'
import { 
  createStore,
  StoreProvider,
  createTypedHooks
} from 'easy-peasy'

import authModel, { AuthModel } from './auth-model'
import themeModel, { ThemeModel } from './theme-model'
import userModel, { UserModel } from './user-model'
import schemeModel, { SchemeModel } from './scheme-model'
import dataModel, { DataModel } from './data-model'

interface StoreModel {
  auth: AuthModel;
  theme: ThemeModel;
  user: UserModel;
  scheme: SchemeModel;
  data: DataModel;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

interface GlobalStoreProps {
  children: ReactNode
}

export const Store = ({ children }:GlobalStoreProps) => {
  const storeModel: StoreModel = {
    auth: authModel,
    theme: themeModel,
    user: userModel,
    scheme: schemeModel,
    data: dataModel
  }
  
  const store = createStore(storeModel);

  return <StoreProvider store={store}>
    {children}
  </StoreProvider>
}