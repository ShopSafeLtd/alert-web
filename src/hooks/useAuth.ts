import type { SetUserPayload } from 'state';
import { useStoreActions, useStoreState } from 'state';
import LogRocket from 'logrocket';

import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import Mixpanel from 'utils/mixpanel';
import { useNavigate } from 'react-router';
import type {
  AvailableDashboardElements,
  DashboardLayout,
} from '#/state/dashboard-model';
import { defaultAdminLayout, defaultUserLayout } from '#/state/dashboard-model';
import type { Translations } from '#/state/scheme-model';
import {
  useAuth as useAuthClerk,
  useSession,
  useUser,
} from '@clerk/clerk-react';
import { useTokenContext } from '#/context/token-context';
import { GoodsMode } from 'graphql/types';
import { useCurrentUserLazyQuery } from '#/hooks/user/queries/current-user.generated';

interface Return {
  rehydrateAuth: () => void;
  signOut: () => void;

  getCurrentUser: () => void;
  loading: boolean;
  expired: () => void;
}

const useAuth = (): Return => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken, signOut: signOutClerk } = useAuthClerk();
  const { token } = useTokenContext();
  const { session } = useSession();
  const navigate = useNavigate();
  // const client = useApolloClient();
  const authenticated = useStoreActions(
    (actions) => actions.auth.authenticated
  );
  const expired = useStoreActions((actions) => actions.auth.expired);
  const handleSignOut = useStoreActions((actions) => actions.auth.signOut);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const clearUser = useStoreActions((actions) => actions.user.clearUser);
  const { setRole, setTodos, setNotifications, setFilterDefaultGroup, setDem } =
    useStoreActions((actions) => actions.user);
  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);
  const setAuthMessage = useStoreActions(
    (actions) => actions.auth.setAuthMessage
  );
  const currentUserId = useStoreState((state) => state.user.id);
  const currentScheme = useStoreState((state) => state.scheme.id);

  const setDashboard = useStoreActions(
    (actions) => actions.dashboard.setSchemeLayouts
  );

  interface HandleSuccessArgs extends SetUserPayload {
    accessToken: string;
    defaultScheme?: string;
  }

  const handleSuccess = async ({
    id,
    accessToken,
    fullName,
    origName,
    email,
    businesses,
    onboarded,
    schemes,
    demId,
    reference,
    userNotifications,
    userMessages,
    defaultGroups,
    reportToAllBusinesses,
    defaultScheme,
    forcePasswordReset,
    hasPassword,
    termsExpired,
  }: // eslint-disable-next-line @typescript-eslint/require-await
  HandleSuccessArgs) => {
    // const color = `hsl(${Math.random() * 360}, 70%, 30%)`;
    const handleNoValidScheme = () => {
      const defScheme =
        schemes.find(({ scheme: { id: sId } }) => sId === defaultScheme) ||
        schemes[0];
      const schemeDetails = defScheme?.scheme;
      window.localStorage.setItem('currentScheme', schemeDetails?.id || '');
      setRole({ role: defScheme?.role });
      setScheme({
        autoPopulateDescription: schemeDetails?.autoPopulateDescription,
        needJustification: schemeDetails?.needJustification,
        requireSiteNumberForUsers: schemeDetails?.requireSiteNumberForUsers,
        oneSelectedIncidentTypeOnly: schemeDetails?.oneSelectedIncidentTypeOnly,
        autoApproveIncidents: schemeDetails?.autoApproveIncidents,
        autoApproveOffenders: schemeDetails?.autoApproveOffenders,
        restrictIncidentAccess: schemeDetails?.restrictIncidentAccess,
        reportOnly: schemeDetails?.reportOnly,
        defaultPublicOffenderDOB: schemeDetails?.defaultPublicOffenderDOB,
        id: schemeDetails?.id,
        name: schemeDetails?.name,
        logo: schemeDetails?.logo?.optimisedPersisted,
        darkLogo: schemeDetails?.darkLogo?.optimisedPersisted,
        userTodos: schemeDetails?.userTodos || 0,
        userNotifications: schemeDetails?.userNotifications || 0,
        translations: schemeDetails?.customTranslations as Translations[],
        goodsMode: schemeDetails?.goodsMode || GoodsMode.Generic,
        facialRecognition: schemeDetails?.facialRecognition,
        facialDetection: schemeDetails?.facialDetection,
        imagesRequiredOnOffenders: schemeDetails?.imagesRequiredOnOffenders,
        taskTimeTracking: schemeDetails?.taskTimeTracking,
        languageCount: schemeDetails?.languageCount || 0,
        connectedToSchemes: schemeDetails?.connectedToSchemes || [],
        activityAssignToUser: schemeDetails?.activityAssignToUser,
        useBusinessGroupsOnIncident: schemeDetails?.useBusinessGroupsOnIncident,
      });
      setFilterDefaultGroup({
        filterDefaultGroups: defaultGroups.filter(
          (el) => el.scheme.id === schemeDetails.id
        ),
      });
      setTodos({ userTodos: defScheme?.scheme?.userTodos || 0 });
      setNotifications({
        userNotifications: defScheme?.scheme?.userNotifications || 0,
      });
    };

    const scheme =
      currentScheme || window.localStorage.getItem('currentScheme');
    if (scheme) {
      const schemeDetails = schemes?.find(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        ({ scheme: { id } }) => id === scheme
      );

      if (schemeDetails) {
        setRole({ role: schemeDetails.role });
        setScheme({
          autoPopulateDescription: schemeDetails.scheme.autoPopulateDescription,
          needJustification: schemeDetails.scheme.needJustification,
          requireSiteNumberForUsers:
            schemeDetails.scheme.requireSiteNumberForUsers,
          oneSelectedIncidentTypeOnly:
            schemeDetails.scheme.oneSelectedIncidentTypeOnly,
          autoApproveIncidents: schemeDetails.scheme.autoApproveIncidents,
          autoApproveOffenders: schemeDetails.scheme.autoApproveOffenders,
          restrictIncidentAccess: schemeDetails.scheme.restrictIncidentAccess,
          reportOnly: schemeDetails.scheme.reportOnly,
          defaultPublicOffenderDOB:
            schemeDetails.scheme.defaultPublicOffenderDOB,
          id: schemeDetails.scheme.id,
          name: schemeDetails.scheme.name,
          logo: schemeDetails.scheme.logo?.optimisedPersisted,
          darkLogo: schemeDetails.scheme.darkLogo?.optimisedPersisted,
          userTodos: schemeDetails.scheme.userTodos,
          userNotifications: schemeDetails?.scheme.userNotifications,
          translations: schemeDetails?.scheme
            .customTranslations as Translations[],
          goodsMode: schemeDetails.scheme.goodsMode,
          facialRecognition: schemeDetails.scheme.facialRecognition,
          facialDetection: schemeDetails.scheme.facialDetection,
          imagesRequiredOnOffenders:
            schemeDetails.scheme.imagesRequiredOnOffenders,
          taskTimeTracking: schemeDetails.scheme.taskTimeTracking,
          languageCount: schemeDetails.scheme.languageCount || 0,
          connectedToSchemes: schemeDetails.scheme.connectedToSchemes || [],
          activityAssignToUser: schemeDetails.scheme.activityAssignToUser,
          useBusinessGroupsOnIncident:
            schemeDetails.scheme.useBusinessGroupsOnIncident,
        });
        setFilterDefaultGroup({
          filterDefaultGroups: defaultGroups.filter(
            (el) => el.scheme.id === schemeDetails.scheme.id
          ),
        });
        setTodos({ userTodos: schemeDetails?.scheme?.userTodos || 0 });
      } else {
        handleNoValidScheme();
      }
    } else {
      handleNoValidScheme();
    }

    // if (window.location.href.includes('app.shopsafe.uk')) {
    //   await OneSignal.init({
    //     appId: '15f85158-c5be-4735-b503-23c4200c94d6',
    //     promptOptions: {

    //     }
    //   }).then(async () => {
    //     await OneSignal.showNativePrompt().then(() => {
    //       // do other stuff
    //     });
    //   });
    // }

    LogRocket.identify(id, {
      fullName,
      email,
    });

    Mixpanel.identify(id);
    Mixpanel.people.set({
      name: fullName || '',
      businessId: businesses[0]?.id || '',
      businessName: businesses[0]?.name || '',
    });
    const filterDefaultGroups = defaultGroups.filter(
      (el) => el.scheme.id === scheme
    );
    Sentry.setUser({ email, username: fullName, id });
    console.log('setting user?');
    setUser({
      id,
      email,
      fullName,
      origName,
      businesses,
      onboarded,
      schemes,
      hasPassword,
      forcePasswordReset,
      isSet: true,
      demId,
      reference,
      userNotifications,
      userMessages,
      defaultGroups,
      filterDefaultGroups,
      reportToAllBusinesses,
      termsExpired,
    });

    const businessToDem = (businesses
      // eslint-disable-next-line no-confusing-arrow
      .map((business) =>
        business.demId ? { name: business.name, id: business.demId } : null
      )
      .filter((el) => el !== null) || []) as { id: string; name: string }[];
    setDem({ dem: businessToDem });
    authenticated(accessToken);
  };

  const [getCurrentUserQuery, { loading, data: CurrentUserData }] =
    useCurrentUserLazyQuery({
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-only',
      canonizeResults: true,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onCompleted: async ({ currentUser }) => {
        if (!currentUser) {
          if (!isLoaded && isSignedIn) {
            expired();
          } else if (!isLoaded && !isSignedIn) {
            navigate('/sign-in');
          }
        }

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
          });
          if (currentUser?.newUser) {
            navigate('/app/onboarding');
          }
        }
      },
      onError: () => expired(),
    });
  const getCurrentUser = () => {
    if (!CurrentUserData && token) {
      void getCurrentUserQuery({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  };
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

  useEffect(() => {
    if (isSignedIn) {
      void (async () => {
        try {
          if (!token) console.log('getting token 4');

          const newToken =
            token ||
            (await getToken({
              leewayInSeconds: 1800,
              template: 'test',
            }));

          if (newToken) {
            authenticated(newToken);
          }
        } catch (error) {
          if (error instanceof Error) setAuthMessage(error.message);
          // console.error(e);
        }
      })();
    }
  }, [isSignedIn]);

  const signOut = () => {
    clearUser();
    handleSignOut();
    const logo = window.localStorage.getItem('logo');
    const dLogo = window.localStorage.getItem('logo-dark');
    window.localStorage.clear();
    window.localStorage.setItem('logo', logo || '');
    window.localStorage.setItem('logo-dark', dLogo || '');
    window.sessionStorage.clear();
    void signOutClerk();
  };

  return {
    // login,
    loading,
    rehydrateAuth,
    signOut,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getCurrentUser,
    expired,
  };
};

export default useAuth;
