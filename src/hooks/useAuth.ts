/* eslint-disable no-console */
import { useApolloClient } from '@apollo/client';
import { useStoreActions, useStoreState, SetUserPayload } from 'state';
import jwtDecode from 'jwt-decode';
import LogRocket from 'logrocket';
import {
  useCurrentUserLazyQuery,
  // useSignInMutation,
  CurrentUserDocument,
  CurrentUserQuery,
} from 'graphql/generated';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

// interface LoginArgs {
//   email: string;
//   password: string;
// }

interface DecodedToken {
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  iss: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}
interface Return {
  // login: ({ email, password }: LoginArgs) => void;
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
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const client = useApolloClient();
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
    organisation,
    onboarded,
    schemes,
    groups,
  }: HandleSuccessArgs) => {
    window.localStorage.setItem('accessToken', accessToken);

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
      organisation,
      onboarded,
      schemes,
      groups,
    });
    authenticated(accessToken);
  };

  const [getCurrentUser, { loading }] = useCurrentUserLazyQuery({
    onCompleted: ({ currentUser }) => {
      handleSuccess({
        id: currentUser?.id || '',
        email: currentUser?.email || '',
        fullName: currentUser?.fullName || '',
        accessToken: window.localStorage.getItem('accessToken') || '',
        organisation: currentUser?.organisation || '',
        onboarded: !currentUser?.newUser,
        // currentUser?.newUser === undefined ? false : !currentUser?.newUser,
        schemes: currentUser?.schemes || [],
        groups: currentUser?.groups || [],
      });
    },
    onError: () => expired(),
    fetchPolicy: 'cache-and-network',
  });

  const rehydrateAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const token: DecodedToken = jwtDecode(accessToken);
      if (new Date().getTime() < token.exp * 1000) {
        if (token.iss === 'https://alert.eu.auth0.com/') {
          getCurrentUser({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            },
          });
        } else {
          expired();
        }
      } else {
        expired();
      }
    } else {
      expired();
    }
  };

  const onLoginSuccess = (data: OnLoginSuccessArgs) => {
    window.localStorage.setItem('accessToken', data.accessToken);

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
      organisation: data.organisation,
      schemes: data.schemes,
      groups: data.groups,
    });
  };

  useEffect(() => {
    // authenticated from auth0
    if (isAuthenticated) {
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          authenticated(token);
          window.localStorage.setItem('accessToken', token);
          try {
            const { data } = await client.query<CurrentUserQuery>({
              query: CurrentUserDocument,
              fetchPolicy: 'network-only',
              context: {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              },
            });
            console.log(data);
            // Adding this in breaks the side and top navs. Not sure why atm
            // onLoginSuccess({
            //   accessToken: token || '',
            //   email: data.currentUser?.email || '',
            //   fullName: data.currentUser?.fullName || '',
            //   id: data.currentUser?.id || '',
            //   onboarded: data.currentUser?.newUser || false,
            //   organisation: data.currentUser?.organisation || '',
            //   schemes: data.currentUser?.schemes || [],
            //   groups: data.currentUser?.groups || [],
            // });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
            setAuthMessage(err.message);
            console.log(err);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }

        // try {

        //   onLoginSuccess({
        //     accessToken: token || '',
        //     email: data.currentUser?.email || '',
        //     fullName: data.currentUser?.fullName || '',
        //     id: data.currentUser?.id || '',
        //     onboarded: data.currentUser?.newUser || false,
        //     organisation: data.currentUser?.organisation || '',
        //     schemes: data.currentUser?.schemes || [],
        //     groups: data.currentUser?.groups || [],
        //   });
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // } catch (err: any) {
        //   setAuthMessage(err.message);
        //   console.log(err);
        // }
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
