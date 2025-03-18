import type { CurrentUserProviderQuery } from '#/providers/UserProvider/__generated__/current-user.generated';

import { useCurrentUserProviderQuery } from '#/providers/UserProvider/__generated__/current-user.generated';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import React, { useState } from 'react';

import {
  CURRENT_SCHEME,
  currentSchemeAtom,
  currentUserSchemeIdAtom,
  useSchemeProvider,
} from '../SchemeProvider/SchemeProvider';

type CurrentUser = CurrentUserProviderQuery['currentUser'];

interface Props {
  children: JSX.Element;
}

export const defaultCurrentUserAtom = {
  businesses: [],
  defaultGroups: [],
  email: '',
  expoPushTokens: [],
  fullName: '',
  groups: [],
  id: '',
  messageCount: 0,
  newUser: false,
  reference: 0,
  reportToAllBusinesses: false,
  schemes: [],
  totalSchemes: 0,
  totalUnreadNotifications: 0,
};
export const currentUserAtom = atom<CurrentUser>(defaultCurrentUserAtom);
export const newUserAtom = atom(true);

export const currentSchemeGroups = atom(
  (get) =>
    get(currentUserAtom)?.groups.filter(
      (group) => group.schemeId === get(currentSchemeAtom).id
    ),
  () => {}
);

export const currentSchemeDefaultGroups = atom(
  (get) =>
    get(currentUserAtom)?.defaultGroups.filter(
      (group) => group.schemeId === get(currentSchemeAtom).id
    ),
  () => {}
);

export const demIdAtom = atom(
  (get) =>
    get(currentUserAtom)?.businesses.find((business) => Boolean(business.demId))
      ?.demId,
  () => {}
);

const UserProvider = ({ children }: Props) => {
  const { setScheme } = useSchemeProvider();

  const currentSchemeId = useAtomValue(currentUserSchemeIdAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const setNewUser = useSetAtom(newUserAtom);

  const [isSet, setIsSet] = useState(false);

  void useCurrentUserProviderQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (currentSchemeId === null && data.currentUser?.schemes[0]) {
        const currentScheme = localStorage.getItem(CURRENT_SCHEME);
        if (currentScheme) {
          void setScheme(currentScheme);
        } else {
          void setScheme(data.currentUser.schemes[0].id);
        }
      }

      void setCurrentUser(data.currentUser);
      void setNewUser(data.currentUser?.newUser ?? false);
      setIsSet(true);
    },
  });

  return isSet ? children : <div />;
};

export default UserProvider;
