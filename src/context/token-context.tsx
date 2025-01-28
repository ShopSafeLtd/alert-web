import type { ReactNode } from 'react';

import { useAuth } from '@clerk/clerk-react';
import jwtDecode from 'jwt-decode';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface TokenContextT {
  getToken: (force?: boolean) => Promise<null | string>;
  setToken: (token: null | string) => void;
  token: null | string;
}

interface JwtPayload {
  exp: number;
}

const TokenContext = createContext<TokenContextT | undefined>(undefined);

// Create a custom hook to use the context
export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
};

export const TokenProvider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const { getToken: getClerkToken, isLoaded, isSignedIn } = useAuth();

  const [token, setToken] = useState<null | string>(null);
  const [expiredToken, setExpiredToken] = useState<null | string>(null);
  const [expireAt, setExpireAt] = useState<null | number>(null);

  const getToken = (force?: boolean) =>
    getClerkToken({
      leewayInSeconds: 1800,
      skipCache: force,
      template: 'shopsafe',
    });

  useEffect(() => {
    if (token && (!expireAt || token !== expiredToken)) {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded) {
        setExpireAt(decoded.exp);
        setExpiredToken(token);
      }
    }
    if (!token && !expireAt && isLoaded && isSignedIn) {
      void getToken(true).then(
        (t) => {
          setToken(t);
        },
        () => {
          setToken(null);
        }
      );
    }
  }, [token, isLoaded, isSignedIn, expireAt]);

  const value = useMemo(() => ({ getToken, setToken, token }), [token]);

  // handle token expiration
  useEffect(() => {
    async function getSetToken() {
      const t = await getToken();
      setToken(t);
    }
    if (expireAt) {
      const interval = setInterval(() => {
        const now = Date.now() / 1000;
        if (now >= expireAt) {
          void getSetToken();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expireAt]);

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
