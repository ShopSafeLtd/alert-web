/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
import { PublicRoutes } from '#/App';
import { useTokenContext } from '#/context/token-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { cache } from '#/providers/cache';
import { useStoreState } from '#/state';
import { ApolloClient, ApolloProvider, split } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth } from '@clerk/clerk-react';
import * as Sentry from '@sentry/react';
import { SentryLink } from 'apollo-link-sentry';
import { sha256 } from 'crypto-hash';
import { createClient } from 'graphql-ws';
import { useAtomValue } from 'jotai/index';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Apollo = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const { getToken, setToken, token } = useTokenContext();

  const location = useLocation();
  const currentRoute = location.pathname;
  useEffect(() => {
    async function getSetToken() {
      const isPublicRoute = currentRoute
        ? PublicRoutes.some((route) => currentRoute.startsWith(route))
        : false;

      if (currentRoute && isPublicRoute) return;
      const t = await getToken(true);
      if (!t && !isSignedIn) {
        if (currentRoute && isPublicRoute) return;

        navigate(
          currentRoute && currentRoute.includes('sign-in')
            ? '/sign-in'
            : `/sign-in?rd=${currentRoute}`
        );
      }
      setToken(t);
    }

    if (!token) {
      void getSetToken();
    }
  }, [token]);

  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const localLang = useStoreState((state) => state.theme.locale);

  const defaultHeaders = {
    type: 'clerk',
  };
  const httpLink = new BatchHttpLink({
    batchInterval: 50, // Wait no more than 50ms after first batched operation
    batchMax: 8, // No more than 8 operations per batch
    uri: import.meta.env.VITE_GRAPHQL_URL,
  });

  let activeSocket: WebSocket;
  let timedOut: number;

  const wsLink = new GraphQLWsLink(
    createClient({
      connectionParams: () => ({
        authorization: `Bearer ${token}`,
      }),
      keepAlive: 10_000,
      lazy: true,
      on: {
        closed: () => {
          clearTimeout(timedOut);
        },
        // eslint-disable-next-line no-return-assign
        connected: (socket) => (activeSocket = socket as WebSocket),
        error: (error) => {
          console.error(`WebSocket error: ${error}`);
        },
        ping: (received) => {
          if (!received) {
            timedOut = window.setTimeout(() => {
              if (activeSocket.readyState === WebSocket.OPEN) {
                // Graceful disconnection
                activeSocket.close(4408, 'Request Timeout');
              }
            }, 5000);
          }
        },
        pong: (received) => {
          if (received) {
            clearTimeout(timedOut);
          } else {
            console.error('Pong not received');
          }
        },
      },
      url: import.meta.env.VITE_GRAPHQL_WS_URL,
    })
  );

  const sentryLink = new SentryLink(/* See options */);

  // const httpLink = createUploadLink({
  //   // uri: "https://alert-api-dev.azurewebsites.net/graphql",
  //   // uri: "https://alert-api-dev-development.azurewebsites.net/graphql",
  //   // uri: 'http://localhost:4000/graphql',
  //   // uri: 'https://alert-dev-api.herokuapp.com/graphql',
  //   uri: import.meta.env.VITE_GRAPHQL_URL,
  // });

  // TODO: Add error handling
  const errorLink = onError(
    ({ forward, graphQLErrors, networkError, operation }) => {
      if (graphQLErrors)
        // eslint-disable-next-line no-restricted-syntax
        for (const { extensions, locations, message, path } of graphQLErrors) {
          const lowerCaseMessage = message.toLowerCase();

          if (
            lowerCaseMessage.includes('user_context') ||
            extensions?.code === '401'
          ) {
            const oldHeaders = operation.getContext().headers;
            void getToken(true).then((t) => {
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `bearer ${t}`,
                },
              });
              // Retry the request, returning the new observable
              return forward(operation);
            });
          }
          if (
            !lowerCaseMessage.startsWith('not auth') &&
            !lowerCaseMessage.startsWith('user_context_error')
          ) {
            Sentry.captureMessage(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                locations
              )}, Path: ${path}`
            );
          }
        }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        if ('statusCode' in networkError) {
          console.log(`Status code: ${networkError.statusCode}`);
        }
        if ('bodyText' in networkError) {
          console.log(`Body: ${networkError.bodyText}`);
        }

        Sentry.captureException(networkError);
      }
    }
  );

  const middlewareLink = setContext((_, { headers, ...context }) => {
    const initAuth = headers?.Authorization;
    if (token) {
      try {
        return {
          ...context,
          headers: {
            ...headers,
            ...defaultHeaders,
            Authorization: initAuth ?? `Bearer ${token}`,
            currentScheme: currentScheme ?? null,
            language: localLang,
          },
          http: { includeExtensions: true, includeQuery: false },
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    return {
      ...context,
      headers: {
        ...headers,
        ...defaultHeaders,
        // eslint-disable-next-line quotes
        Authorization: initAuth ?? `Bearer ""`,
        currentScheme: currentScheme ?? null,
        language: localLang,
      },
      http: { includeExtensions: true, includeQuery: false },
    };
  });

  const persistedQueryLink = createPersistedQueryLink({
    sha256,
  });

  const authHttp = sentryLink
    // eslint-disable-next-line unicorn/prefer-spread
    .concat(errorLink)
    // eslint-disable-next-line unicorn/prefer-spread
    .concat(middlewareLink)
    // eslint-disable-next-line unicorn/prefer-spread
    .concat(persistedQueryLink)
    // eslint-disable-next-line unicorn/prefer-spread
    .concat(httpLink);

  const link = split(
    ({ query }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authHttp
  );

  const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
