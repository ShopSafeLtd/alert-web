import { useStoreActions, useStoreState } from 'state';

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import type {
  AvailableDashboardElements,
  DashboardLayout,
} from '#/state/dashboard-model';
import { defaultAdminLayout, defaultUserLayout } from '#/state/dashboard-model';
import { useSession, useUser } from '@clerk/clerk-react';
import { useTokenContext } from '#/context/token-context';
import { useCurrentUserQuery } from '#/hooks/user/queries/current-user.generated';
import { handleSuccess } from '#/hooks/handleSuccess';

interface Return {
  rehydrateAuth: () => void;
  getCurrentUser: () => void;
  loading: boolean;
  expired: () => void;
}
const getCurrentUser = () => {};

const useAuth = (): Return => {
  const hasFetched = useRef(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const { token, getToken } = useTokenContext();
  const { session } = useSession();
  const navigate = useNavigate();
  // const client = useApolloClient();
  const authenticated = useStoreActions(
    (actions) => actions.auth.authenticated
  );
  const expired = useStoreActions((actions) => actions.auth.expired);
  const currentUserId = useStoreState((state) => state.user.id);
  const currentScheme = useStoreState((state) => state.scheme.id);
  const { setRole, setTodos, setNotifications, setFilterDefaultGroup, setDem } =
    useStoreActions((actions) => actions.user);
  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const setDashboard = useStoreActions(
    (actions) => actions.dashboard.setSchemeLayouts
  );

  const { loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-first',
    onError: () => expired(),
    skip: !isSignedIn || hasFetched.current || !isLoaded || !token,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onCompleted: async ({ currentUser }) => {
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
          const currentS =
            currentUser &&
            currentUser.schemes.find((s) => s.scheme.id === scheme);
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
              marquee:
                item.dashboard?.runningBanner ??
                (item.isAdmin
                  ? defaultAdminLayout.marquee
                  : defaultUserLayout.marquee),
              layout: item.dashboard?.layout
                ? item.dashboard?.layout.map((lay) => ({
                    ...lay,
                    i: lay.i as AvailableDashboardElements,
                    static: !!lay.static,
                    isBounded: true,
                    isDraggable: false,
                    isResizable: false,
                    maxH: lay.maxH ?? undefined,
                    maxW: lay.maxW ?? undefined,
                    minH: lay.minH ?? undefined,
                    minW: lay.minW ?? undefined,
                  }))
                : item.isAdmin
                ? defaultAdminLayout.layout
                : defaultUserLayout.layout,
            };
          }

        setDashboard(result);

        await handleSuccess({
          id: currentUser?.id || '',
          email: currentUser?.email || '',
          fullName: currentUser?.fullName || '',
          origName: currentUser?.origName || '',
          accessToken: window.localStorage.getItem('access_token') || '',
          businesses: currentUser?.businesses || [],
          onboarded: !currentUser?.newUser,
          schemes: currentUser?.schemes || [],
          demId: currentUser?.demId || '',
          isSet: true,
          reportToAllBusinesses: currentUser?.reportToAllBusinesses || false,
          forcePasswordReset: currentUser?.forcePasswordReset ?? false,
          hasPassword: currentUser?.hasPassword ?? false,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          reference: `${currentUser?.reference}` || '',
          userNotifications: currentUser?.notificationCount || 0,
          userMessages: currentUser?.messageCount || 0,
          defaultGroups: currentUser?.defaultGroups || [],
          defaultScheme: currentUser?.defaultScheme || undefined,
          termsExpired: currentUser?.termsExpired || false,
          filterDefaultGroups:
            currentUser?.defaultGroups.filter(
              (el) => el.scheme.id === scheme
            ) || [],
          currentScheme,
          setRole,
          setScheme,
          setFilterDefaultGroup,
          setTodos,
          setNotifications,
          setUser,
          setDem,
          authenticated,
        });
        if (currentUser?.newUser) {
          navigate('/app/onboarding');
        }
      }
    },
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
    // login,
    loading,
    rehydrateAuth,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getCurrentUser,
    expired,
  };
};

export default useAuth;
