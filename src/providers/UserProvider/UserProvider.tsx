import type { CurrentUserProviderQuery } from '#/providers/UserProvider/__generated__/current-user.generated';

import { useTokenContext } from '#/context/token-context';
import { useCurrentUserProviderQuery } from '#/providers/UserProvider/__generated__/current-user.generated';
import { useStoreActions } from '#/state';
import Mixpanel from '#/utils/mixpanel';
import { useUser } from '@clerk/clerk-react';
import * as Sentry from '@sentry/react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';

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
  // permissionsId: '',
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
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const { setScheme } = useSchemeProvider();
  const { isLoaded, isSignedIn } = useUser();
  const { getToken, token } = useTokenContext();

  const currentSchemeId = useAtomValue(currentUserSchemeIdAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const setNewUser = useSetAtom(newUserAtom);

  const expired = useStoreActions((actions) => actions.auth.expired);

  const onCompleted = useCallback(
    (data: CurrentUserProviderQuery) => {
      if (hasFetched.current) return;
      // existing onCompleted logic:
      if (!data.currentUser) {
        if (!isLoaded && isSignedIn) {
          expired();
          void getToken();
        } else if (!isLoaded && !isSignedIn) {
          navigate('/sign-in');
        }
      }
      hasFetched.current = true;
      if (currentSchemeId === null && data.currentUser?.schemes[0]) {
        const currentScheme = localStorage.getItem(CURRENT_SCHEME);
        if (currentScheme) {
          void setScheme(currentScheme);
        } else {
          void setScheme(data.currentUser.schemes[0].id);
        }
      }
      if (data.currentUser) {
        Mixpanel.identify(data.currentUser.id);
        Mixpanel.people.set({
          businessId: data.currentUser.businesses[0]?.id || '',
          businessName: data.currentUser.businesses[0]?.name || '',
          name: data.currentUser.fullName || '',
        });
        Sentry.setUser({
          email: data.currentUser.email ?? '',
          id: data.currentUser.id,
          username: data.currentUser.fullName,
        });
      }
      void setCurrentUser(data.currentUser);
      void setNewUser(data.currentUser?.newUser ?? false);
    },
    [
      expired,
      getToken,
      isLoaded,
      isSignedIn,
      navigate,
      currentSchemeId,
      setScheme,
      setCurrentUser,
      setNewUser,
    ]
  );

  const onError = useCallback(() => {
    if (!isLoaded && isSignedIn) {
      expired();
      void getToken();
    } else if (!isLoaded && !isSignedIn) {
      navigate('/sign-in');
    }
  }, [expired, getToken, isLoaded, isSignedIn, navigate]);

  useCurrentUserProviderQuery({
    onCompleted,
    onError,
    skip: !token || hasFetched.current,
  });

  return children;
};

export default React.memo(UserProvider);
