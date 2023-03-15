import { SetUserPayload, useStoreActions, useStoreState } from 'state';
import LogRocket from 'logrocket';
import { useCurrentUserLazyQuery } from 'graphql/generated';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

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
  const setRole = useStoreActions((actions) => actions.user.setRole);
  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);
  const setAuthMessage = useStoreActions(
    (actions) => actions.auth.setAuthMessage
  );
  const currentScheme = useStoreState((state) => state.scheme.id);

  interface HandleSuccessArgs extends SetUserPayload {
    accessToken: string;
  }

  const handleSuccess = ({
    id,
    accessToken,
    fullName,
    email,
    businesses,
    onboarded,
    schemes,
    demId,
    groups,
    reference,
  }: HandleSuccessArgs) => {
    window.localStorage.setItem('access_token', accessToken);
    const color = `hsl(${Math.random() * 360}, 70%, 30%)`;

    localStorage.setItem(
      'current-user',
      JSON.stringify({ id, name: fullName, color })
    );

    const handleNoValidScheme = () => {
      const schemeDetails = schemes[0]?.scheme;
      window.localStorage.setItem('currentScheme', schemeDetails?.id);
      setRole({ role: schemes[0]?.role });
      setScheme({
        autoApproveIncidents: schemeDetails?.autoApproveIncidents,
        autoApproveOffenders: schemeDetails?.autoApproveOffenders,
        id: schemeDetails?.id,
        name: schemeDetails?.name,
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
          id: schemeDetails.scheme.id,
          name: schemeDetails.scheme.name,
        });
      } else {
        handleNoValidScheme();
      }
    } else {
      handleNoValidScheme();
    }

    LogRocket.identify(id, {
      fullName,
      email,
    });

    setUser({
      id,
      email,
      fullName,
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
    onCompleted: ({ currentUser }) => {
      handleSuccess({
        id: currentUser?.id || '',
        email: currentUser?.email || '',
        fullName: currentUser?.fullName || '',
        accessToken: window.localStorage.getItem('access_token') || '',
        businesses: currentUser?.businesses || [],
        onboarded: !currentUser?.newUser,
        schemes: currentUser?.schemes || [],
        groups: currentUser?.groups || [],
        demId: currentUser?.demId || '',
        isSet: true,
        reference: `${currentUser?.reference}` || '',
      });
    },
    onError: () => expired(),
    fetchPolicy: 'cache-and-network',
  });

  const rehydrateAuth = () => {
    if (user !== undefined) {
      if (new Date().getTime() < user.exp * 1000) {
        if (user.iss === 'https://alert.eu.auth0.com/') {
          getCurrentUser();
        } else if (isAuthenticated) {
          getCurrentUser();
        } else {
          expired();
        }
      } else {
        expired();
      }
    } else if (isAuthenticated) {
      getCurrentUser();
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

  const onLoginSuccess = (data: OnLoginSuccessArgs) => {
    window.localStorage.setItem('access_token', data.accessToken);

    const scheme = window.localStorage.getItem('currentScheme');
    if (!scheme) {
      window.localStorage.setItem('currentScheme', data.schemes[0].scheme.id);
    }

    LogRocket.identify(data.id, {
      name: data.fullName,
      email: data.email,
    });

    handleSuccess({
      id: data.id,
      accessToken: data.accessToken,
      email: data.email,
      fullName: data.fullName,
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
      (async () => {
        try {
          const newToken = await getAccessTokenSilently();

          authenticated(newToken);
          window.localStorage.setItem('access_token', newToken);
        } catch (e) {
          if (e instanceof Error) setAuthMessage(e.message);
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
    window.localStorage.clear();
    window.sessionStorage.clear();
  };

  return {
    // login,
    loading,
    rehydrateAuth,
    signOut,
    onLoginSuccess,
    getCurrentUser,
  };
};

export default useAuth;
