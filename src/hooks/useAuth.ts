import { useMutation, useLazyQuery } from "@apollo/client";
import { useStoreActions, SetUserPayload } from "state";
import jwtDecode from "jwt-decode";
import LogRocket from "logrocket";

import { CurrentUser, CurrentUserRes } from "graphql-src/auth/queries";
import { SignIn, SignInArgs, SignInRes } from "graphql-src/auth/mutations";

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

const useAuth = () => {
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
  }: HandleSuccessArgs) => {
    window.localStorage.setItem("accessToken", accessToken);

    const handleNoValidScheme = () => {
      const schemeDetails = schemes[0].scheme;
      window.localStorage.setItem("currentScheme", schemeDetails.id);
      setRole({ role: schemes[0].role });
      setScheme({
        autoApproveIncidents: schemeDetails.autoApproveIncidents,
        autoApproveOffenders: schemeDetails.autoApproveOffenders,
        id: schemeDetails.id,
        name: schemeDetails.name,
      });
    };

    const scheme = window.localStorage.getItem("currentScheme");
    if (scheme) {
      const schemeDetails = schemes.find(({ scheme: { id } }) => id === scheme);
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

    LogRocket.identify(id!, {
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
    });
    authenticated(accessToken);
  };

  const rehydrateAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!!accessToken) {
      let token: DecodedToken = jwtDecode(accessToken);
      if (new Date().getTime() < token.exp * 1000) {
        if (token.iss === "https://alert.eu.auth0.com/") {
          getCurrentUser();
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

  interface OnLoginSuccessArgs extends SetUserPayload {
    accessToken: string;
  }

  const onLoginSuccess = (data: OnLoginSuccessArgs) => {
    window.localStorage.setItem("accessToken", data.accessToken);

    const scheme = window.localStorage.getItem("currentScheme");
    if (scheme) {
    } else {
      window.localStorage.setItem("currentScheme", data.schemes[0].scheme.id);
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
    });
  };

  const [handleLogin] = useMutation<SignInRes, SignInArgs>(SignIn, {
    onCompleted: ({ signIn }) => {
      onLoginSuccess({
        accessToken: signIn.accessToken,
        email: signIn.email,
        fullName: signIn.fullName,
        id: signIn.id,
        onboarded: !signIn.newUser,
        organisation: signIn.organisation,
        schemes: signIn.schemes,
      });
    },
    onError: (error) => {
      console.log(error);
      setAuthMessage(error.message);
    },
  });

  const [getCurrentUser] = useLazyQuery<CurrentUserRes>(CurrentUser, {
    onCompleted: ({ currentUser }) => {
      handleSuccess({
        id: currentUser?.id,
        email: currentUser?.email,
        fullName: currentUser?.fullName,
        accessToken: window.localStorage.getItem("accessToken")!,
        organisation: currentUser?.organisation,
        onboarded: !currentUser.newUser,
        schemes: currentUser.schemes,
      });
    },
    onError: (error) => expired(),
  });

  interface LoginArgs {
    email: string;
    password: string;
  }

  const login = ({ email, password }: LoginArgs) => {
    handleLogin({
      variables: {
        email,
        password,
      },
    });
  };

  const signOut = () => {
    clearUser();
    handleSignOut();
    window.localStorage.removeItem("accessToken");
  };

  return {
    login,
    rehydrateAuth,
    signOut,
    onLoginSuccess,
    getCurrentUser,
  };
};

export default useAuth;
