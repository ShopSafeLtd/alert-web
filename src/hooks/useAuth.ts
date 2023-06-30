import type { SetUserPayload } from 'state';
import { useStoreActions, useStoreState } from 'state';
import LogRocket from 'logrocket';
import { useCurrentUserLazyQuery } from 'graphql/generated';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import Mixpanel from 'utils/mixpanel';
// import OneSignal from 'react-onesignal';

interface Return {
  rehydrateAuth: () => void;
  signOut: () => void;
  onLoginSuccess: (data: OnLoginSuccessArgs) => void;
  getCurrentUser: () => void;
  loading: boolean;
}

interface OnLoginSuccessArgs extends SetUserPayload {
  accessToken: string;
}

const useAuth = (): Return => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  // const client = useApolloClient();
  const authenticated = useStoreActions(
    (actions) => actions.auth.authenticated
  );
  const expired = useStoreActions((actions) => actions.auth.expired);
  const handleSignOut = useStoreActions((actions) => actions.auth.signOut);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const clearUser = useStoreActions((actions) => actions.user.clearUser);
  const { setRole, setTodos, setNotifications } = useStoreActions(
    (actions) => actions.user
  );

  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);
  const setAuthMessage = useStoreActions(
    (actions) => actions.auth.setAuthMessage
  );
  const currentScheme = useStoreState((state) => state.scheme.id);

  interface HandleSuccessArgs extends SetUserPayload {
    accessToken: string;
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
    groups,
    reference,
  }: HandleSuccessArgs) => {
    // const color = `hsl(${Math.random() * 360}, 70%, 30%)`;

    const handleNoValidScheme = () => {
      const schemeDetails = schemes[0]?.scheme;
      window.localStorage.setItem('currentScheme', schemeDetails?.id);
      setRole({ role: schemes[0]?.role });
      setScheme({
        autoApproveIncidents: schemeDetails?.autoApproveIncidents,
        autoApproveOffenders: schemeDetails?.autoApproveOffenders,
        defaultPublicOffenderDOB: schemeDetails?.defaultPublicOffenderDOB,
        id: schemeDetails?.id,
        name: schemeDetails?.name,
        logo: schemeDetails?.logo?.optimisedPersisted,
        darkLogo: schemeDetails?.darkLogo?.optimisedPersisted,
        userTodos: schemeDetails?.userTodos || 0,
        userNotifications: schemeDetails?.userNotifications || 0,
      });
      setTodos({ userTodos: schemes[0]?.scheme?.userTodos || 0 });
      setNotifications({
        userNotifications: schemes[0]?.scheme?.userNotifications || 0,
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
          autoApproveIncidents: schemeDetails.scheme.autoApproveIncidents,
          autoApproveOffenders: schemeDetails.scheme.autoApproveOffenders,
          defaultPublicOffenderDOB:
            schemeDetails.scheme.defaultPublicOffenderDOB,
          id: schemeDetails.scheme.id,
          name: schemeDetails.scheme.name,
          logo: schemeDetails.scheme.logo?.optimisedPersisted,
          darkLogo: schemeDetails.scheme.darkLogo?.optimisedPersisted,
          userTodos: schemeDetails.scheme.userTodos,
          userNotifications: schemeDetails?.scheme.userNotifications,
        });
        setTodos({ userTodos: schemeDetails?.scheme?.userTodos || 0 });
        setNotifications({
          userNotifications: schemes[0]?.scheme?.userNotifications || 0,
        });
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
      name: fullName,
      businessId: businesses[0]?.id,
      businessName: businesses[0]?.name,
    });

    Sentry.setUser({ email, username: fullName, id });

    setUser({
      id,
      email,
      fullName,
      origName,
      businesses,
      onboarded,
      schemes,
      groups,
      isSet: true,
      demId,
      reference,
    });
    authenticated(accessToken);
  };

  const [getCurrentUser, { loading }] = useCurrentUserLazyQuery({
    nextFetchPolicy: 'cache-and-network',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onCompleted: async ({ currentUser }) => {
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
      await handleSuccess({
        id: currentUser?.id || '',
        email: currentUser?.email || '',
        fullName: currentUser?.fullName || '',
        origName: currentUser?.origName || '',
        accessToken: window.localStorage.getItem('access_token') || '',
        businesses: currentUser?.businesses || [],
        onboarded: !currentUser?.newUser,
        schemes: currentUser?.schemes || [],
        groups: currentUser?.groups || [],
        demId: currentUser?.demId || '',
        isSet: true,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        reference: `${currentUser?.reference}` || '',
      });
    },
    onError: () => expired(),
    fetchPolicy: 'cache-and-network',
  });

  const rehydrateAuth = () => {
    if (user !== undefined) {
      if (Date.now() < user.exp * 1000) {
        if (user.iss === 'https://alert.eu.auth0.com/') {
          void getCurrentUser();
        } else if (isAuthenticated) {
          void getCurrentUser();
        } else {
          expired();
        }
      } else {
        expired();
      }
    } else if (isAuthenticated) {
      void getCurrentUser();
    } else {
      expired();
    }
    // const accessToken = localStorage.getItem('accessToken');
    // if (accessToken) {
    //   const token: DecodedToken = jwtDecode(accessToken);
    //   if (new Date().getTime() < token.exp * 1000) {
    //     if (token.iss === 'https://alert.eu.auth0.com/') {
    //       getCurrentUser({
    //         context: {
    //           headers: {
    //             authorization: `Bearer ${accessToken}`,
    //           },
    //         },
    //       });
    //     } else {
    //       expired();
    //     }
    //   } else {
    //     expired();
    //   }
    // } else {
    //   expired();
    // }
  };

  const onLoginSuccess = async (data: OnLoginSuccessArgs) => {
    window.localStorage.setItem('access_token', data.accessToken);

    const scheme = window.localStorage.getItem('currentScheme');
    if (!scheme) {
      window.localStorage.setItem('currentScheme', data.schemes[0].scheme.id);
    }

    LogRocket.identify(data.id, {
      name: data.fullName,
      email: data.email,
    });

    await handleSuccess({
      id: data.id,
      accessToken: data.accessToken,
      email: data.email,
      fullName: data.fullName,
      origName: data.origName,
      onboarded: data.onboarded,
      businesses: data.businesses,
      schemes: data.schemes,
      groups: data.groups,
      isSet: true,
      demId: data.demId,
      reference: data.reference,
    });
  };

  // useEffect(() => {
  //   // authenticated from auth0
  //   if (isAuthenticated) {
  //     (async () => {
  //       try {
  //         const token = await getAccessTokenSilently();
  //         authenticated(token);
  //         window.localStorage.setItem('accessToken', token);
  //         try {
  //           const { data } = await client.query<CurrentUserQuery>({
  //             query: CurrentUserDocument,
  //             fetchPolicy: 'network-only',
  //             context: {
  //               headers: {
  //                 authorization: `Bearer ${token}`,
  //               },
  //             },
  //           });
  //           console.log(data);
  //           // Adding this in breaks the side and top navs. Not sure why atm
  //           // onLoginSuccess({
  //           //   accessToken: token || '',
  //           //   email: data.currentUser?.email || '',
  //           //   fullName: data.currentUser?.fullName || '',
  //           //   id: data.currentUser?.id || '',
  //           //   onboarded: data.currentUser?.newUser || false,
  //           //   organisation: data.currentUser?.organisation || '',
  //           //   schemes: data.currentUser?.schemes || [],
  //           //   groups: data.currentUser?.groups || [],
  //           // });
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         } catch (err: any) {
  //           setAuthMessage(err.message);
  //           console.log(err);
  //         }
  //       } catch (e) {
  //         // eslint-disable-next-line no-console
  //         console.error(e);
  //       }
  //
  //       // try {
  //
  //       //   onLoginSuccess({
  //       //     accessToken: token || '',
  //       //     email: data.currentUser?.email || '',
  //       //     fullName: data.currentUser?.fullName || '',
  //       //     id: data.currentUser?.id || '',
  //       //     onboarded: data.currentUser?.newUser || false,
  //       //     organisation: data.currentUser?.organisation || '',
  //       //     schemes: data.currentUser?.schemes || [],
  //       //     groups: data.currentUser?.groups || [],
  //       //   });
  //       //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       // } catch (err: any) {
  //       //   setAuthMessage(err.message);
  //       //   console.log(err);
  //       // }
  //     })();
  //   }
  // }, [isAuthenticated]);
  useEffect(() => {
    if (isAuthenticated) {
      void (async () => {
        try {
          const newToken = await getAccessTokenSilently();

          authenticated(newToken);
          window.localStorage.setItem('access_token', newToken);
        } catch (error) {
          if (error instanceof Error) setAuthMessage(error.message);
          // console.error(e);
        }
      })();
    }
  }, [isAuthenticated]);
  // const login = ({ email, password }: LoginArgs) => {
  //   window.localStorage.removeItem('accessToken');
  //   handleLogin({
  //     variables: {
  //       email,
  //       password,
  //     },
  //   });
  // };

  const signOut = () => {
    clearUser();
    handleSignOut();
    const logo = window.localStorage.getItem('logo');
    const dLogo = window.localStorage.getItem('logo-dark');

    window.localStorage.clear();
    window.localStorage.setItem('logo', logo || '');
    window.localStorage.setItem('logo-dark', dLogo || '');

    window.sessionStorage.clear();
  };

  return {
    // login,
    loading,
    rehydrateAuth,
    signOut,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onLoginSuccess,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getCurrentUser,
  };
};

export default useAuth;
