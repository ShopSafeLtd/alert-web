import type { CurrentUserProviderQuery } from '#/providers/UserProvider/__generated__/current-user.generated';

import { useCurrentUserProviderQuery } from '#/providers/UserProvider/__generated__/current-user.generated';
import Mixpanel from '#/utils/mixpanel';
import * as Sentry from '@sentry/react';
import { atom, useAtomValue, useSetAtom } from 'jotai';

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

export const defaultCurrentUserAtom: CurrentUser = {
  businesses: [],
  defaultGroups: [],
  email: '',
  expoPushTokens: [],
  forcePasswordReset: false,
  fullName: '',
  groups: [],
  hasPassword: true,
  id: '',
  messageCount: 0,
  newUser: false,
  reference: 0,
  reportToAllBusinesses: false,
  schemes: [],
  termsExpired: false,
  totalSchemes: 0,
  totalUnreadNotifications: 0,
};
export const currentUserAtom = atom<CurrentUser>(defaultCurrentUserAtom);
export const newUserAtom = atom(true);
export const userIdAtom = atom(
  (get) => get(currentUserAtom)?.id ?? '',
  () => {}
);
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

export const demIdsAtom = atom(
  (get) =>
    get(currentUserAtom)
      ?.businesses.filter((business) => Boolean(business.demId))
      ?.map((business) => business.demId) ?? [],
  () => {}
);

export const demOptionsAtom = atom(
  (get) =>
    get(currentUserAtom)
      ?.businesses.filter((business) => Boolean(business.demId))
      ?.map((business) => ({ id: business.demId, name: business.name })) ?? [],
  () => {}
);

export const userSchemesAtom = atom(
  (get) => get(currentUserAtom)?.schemes ?? [],
  () => {}
);

const UserProvider = ({ children }: Props) => {
  const { setScheme } = useSchemeProvider();

  const currentSchemeId = useAtomValue(currentUserSchemeIdAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const setNewUser = useSetAtom(newUserAtom);

  void useCurrentUserProviderQuery({
    onCompleted: (data) => {
      if (currentSchemeId === null && data.currentUser?.schemes[0]) {
        const currentScheme = localStorage.getItem(CURRENT_SCHEME);
        if (currentScheme) {
          void setScheme(currentScheme);
        } else {
          void setScheme(data.currentUser.schemes[0].id);
        }
      }

      if (data.currentUser) {
        Mixpanel.identify(data.currentUser?.id);
        Mixpanel.people.set({
          businessId: data.currentUser?.businesses[0]?.id || '',
          businessName: data.currentUser?.businesses[0]?.name || '',
          name: data.currentUser.fullName || '',
        });
        Sentry.setUser({
          email: data.currentUser?.email ?? '',
          id: data.currentUser?.id,
          username: data.currentUser.fullName,
        });
      }

      void setCurrentUser(data.currentUser);
      void setNewUser(data.currentUser?.newUser ?? false);
    },
  });

  return children;
};

export default UserProvider;
