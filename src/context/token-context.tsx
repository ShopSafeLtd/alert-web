import type { ReactNode } from 'react';

import { useAuth } from '@clerk/clerk-react';
import jwtDecode from 'jwt-decode';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  const [_, setExpireAt] = useState<null | number>(null);

  const fetchToken = useCallback(
    (force?: boolean) =>
      getClerkToken({
        leewayInSeconds: 1800,
        skipCache: force,
        template: 'shopsafe',
      }),
    [getClerkToken]
  );

  // Initial token fetch once user is loaded and signed in
  useEffect(() => {
    if (!token && isLoaded && isSignedIn) {
      fetchToken(true)
        .then((t) => setToken(t))
        .catch(() => setToken(null));
    }
  }, [isLoaded, isSignedIn, fetchToken, token]);

  // Decode token and schedule a refresh before expiry
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode<JwtPayload>(token);
    const expiresAtMs = decoded.exp * 1000;
    setExpireAt(decoded.exp);

    // Clear any existing timer
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }

    // Schedule a refresh 2 minutes before expiry
    const refreshIn = expiresAtMs - Date.now() - 2 * 60 * 1000;
    refreshTimeout.current = setTimeout(
      () => {
        fetchToken(true)
          .then((t) => setToken(t))
          .catch(() => setToken(null));
      },
      Math.max(refreshIn, 0)
    );

    return () => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
    };
  }, [token, fetchToken]);

  const value = useMemo(
    () => ({ getToken: fetchToken, setToken, token }),
    [fetchToken, token]
  );

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
