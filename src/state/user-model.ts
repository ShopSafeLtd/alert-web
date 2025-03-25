/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import type { PermissionModel } from 'graphql/types';

import { action } from 'easy-peasy';

export interface SetUserPayload {
  empty: null;
}

export interface SetUserTodos {
  userTodos: number;
}

export interface SetUserNotifications {
  userNotifications: number;
}
export interface SetUserMessages {
  userMessages: number;
}

export interface Permissions {
  model: PermissionModel;
}

export interface UserModel {
  setMessages: Action<UserModel, SetUserMessages>;
  setNotifications: Action<UserModel, SetUserNotifications>;
  setPasswordSet: Action<UserModel>;
  setTodos: Action<UserModel, SetUserTodos>;
  userOnboarded: Action<UserModel>;
}

const userModel: UserModel = {
  setMessages: action(() => {}),
  setNotifications: action(() => {}),
  setPasswordSet: action(() => {}),
  setTodos: action(() => {}),
  userOnboarded: action(() => {}),
};

export default userModel;
