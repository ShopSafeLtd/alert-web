import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAuth } from '@clerk/clerk-react';
import jwtDecode from 'jwt-decode';

interface TokenContextT {
  token: string | null;
  setToken: (token: string | null) => void;
  getToken: (force?: boolean) => Promise<string | null>;
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
  const { getToken: getClerkToken, isSignedIn, isLoaded } = useAuth();

  const [token, setToken] = React.useState<string | null>(null);
  const [expiredToken, setExpiredToken] = React.useState<string | null>(null);
  const [expireAt, setExpireAt] = React.useState<number | null>(null);

  const getToken = (force?: boolean) =>
    getClerkToken({
      leewayInSeconds: 1800,
      template: 'test',
      skipCache: force,
    });

  useEffect(() => {
    if (token && (!expireAt || token !== expiredToken)) {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded) {
        setExpireAt(decoded.exp);
        setExpiredToken(token);
      }
    }
  }, [token, isLoaded, isSignedIn, expireAt]);

  const value = useMemo(() => ({ token, setToken, getToken }), [token]);

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
