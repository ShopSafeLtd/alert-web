import type {
  AvailableDashboardElements,
  DashboardLayout,
} from '#/state/dashboard-model';

import { useTokenContext } from '#/context/token-context';
import { useCurrentUserQuery } from '#/hooks/user/queries/__generated__/current-user.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { defaultAdminLayout, defaultUserLayout } from '#/state/dashboard-model';
import { useSession, useUser } from '@clerk/clerk-react';
import { useAtomValue } from 'jotai/index';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useStoreActions } from 'state';

interface Return {
  expired: () => void;
  getCurrentUser: () => void;
  loading: boolean;
  rehydrateAuth: () => void;
}
const getCurrentUser = () => {};

const useAuth = (): Return => {
  const hasFetched = useRef(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken, token } = useTokenContext();
  const { session } = useSession();
  const navigate = useNavigate();
  // const client = useApolloClient();
  const authenticated = useStoreActions(
    (actions) => actions.auth.authenticated
  );
  const expired = useStoreActions((actions) => actions.auth.expired);
  const currentUserId = useAtomValue(userIdAtom);
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const setDashboard = useStoreActions(
    (actions) => actions.dashboard.setSchemeLayouts
  );

  const { loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-first',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onCompleted: ({ currentUser }) => {
      if (!currentUser) {
        if (!isLoaded && isSignedIn) {
          expired();
          void getToken();
        } else if (!isLoaded && !isSignedIn) {
          navigate('/sign-in');
        }
      }

      hasFetched.current = true;
      if (currentUserId !== currentUser?.id) {
        const scheme =
          currentScheme || window.localStorage.getItem('currentScheme');

        if (scheme) {
          const currentS = currentUser?.schemes.find(
            (s) => s.scheme.id === scheme
          );
          if (currentS) {
            window.localStorage.setItem(
              'logo',
              currentS?.scheme?.logo?.optimisedPersisted || ''
            );
            if (!currentS?.scheme?.logo?.optimisedPersisted) {
              window.localStorage.setItem('logo', '');
            }
            window.localStorage.setItem(
              'logo-dark',
              currentS?.scheme?.darkLogo?.optimisedPersisted || ''
            );
          }
        }

        const result: { [key: string]: DashboardLayout } = {};

        if (currentUser?.schemes)
          // eslint-disable-next-line no-unsafe-optional-chaining,no-restricted-syntax
          for (const item of currentUser?.schemes) {
            result[item.scheme.id] = {
              layout: item.dashboard?.layout
                ? item.dashboard?.layout.map((lay) => ({
                    ...lay,
                    i: lay.i as AvailableDashboardElements,
                    isBounded: true,
                    isDraggable: false,
                    isResizable: false,
                    maxH: lay.maxH ?? undefined,
                    maxW: lay.maxW ?? undefined,
                    minH: lay.minH ?? undefined,
                    minW: lay.minW ?? undefined,
                    static: !!lay.static,
                  }))
                : item.isAdmin
                  ? defaultAdminLayout.layout
                  : defaultUserLayout.layout,
              marquee:
                item.dashboard?.runningBanner ??
                (item.isAdmin
                  ? defaultAdminLayout.marquee
                  : defaultUserLayout.marquee),
            };
          }

        setDashboard(result);

        authenticated(window.localStorage.getItem('access_token') || '');

        if (currentUser?.newUser) {
          navigate('/app/onboarding');
        }
      }
    },
    onError: () => expired(),
    skip: !isSignedIn || hasFetched.current || !isLoaded || !token,
  });

  const rehydrateAuth = () => {
    if (user !== undefined && session?.expireAt instanceof Date) {
      if (Date.now() < session.expireAt.getTime()) {
        if (isSignedIn) {
          void getCurrentUser();
        } else {
          expired();
        }
      } else {
        expired();
      }
    } else if (isSignedIn) {
      void getCurrentUser();
    } else {
      expired();
    }
  };

  // useEffect(() => {
  //   if (isSignedIn) {
  //     void (async () => {
  //       try {
  //         if (!token) console.log('getting token 4');
  //
  //         const newToken =
  //           token ||
  //           (await getToken({
  //             leewayInSeconds: 1800,
  //             template: 'test',
  //           }));
  //
  //         if (newToken) {
  //           authenticated(newToken);
  //         }
  //       } catch (error) {
  //         if (error instanceof Error) setAuthMessage(error.message);
  //         // console.error(e);
  //       }
  //     })();
  //   }
  // }, [isSignedIn]);

  useEffect(() => {
    if (token) authenticated(token);
  }, [token]);

  return {
    expired,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getCurrentUser,
    // login,
    loading,
    rehydrateAuth,
  };
};

export default useAuth;
