import { useTokenContext } from '#/context/token-context';
import { useSession, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useStoreActions } from 'state';

interface Return {
  expired: () => void;
  getCurrentUser: () => void;
  rehydrateAuth: () => void;
}
const getCurrentUser = () => {};

const useAuth = (): Return => {
  const { isSignedIn, user } = useUser();
  const { token } = useTokenContext();
  const { session } = useSession();
  const authenticated = useStoreActions(
    (actions) => actions.auth.authenticated
  );
  const expired = useStoreActions((actions) => actions.auth.expired);

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
    if (token) {
      authenticated(token);
    }
  }, [token]);

  return {
    expired,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getCurrentUser,
    rehydrateAuth,
  };
};

export default useAuth;
