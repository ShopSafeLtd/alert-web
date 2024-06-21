/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { ApolloClient, ApolloProvider, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import * as Sentry from '@sentry/react';
import { SentryLink } from 'apollo-link-sentry';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { sha256 } from 'crypto-hash';
import { cache } from '#/providers/cache';
import { useStoreState } from '../state';
import { useAuth } from '@clerk/clerk-react';

import { useNavigate } from 'react-router';
import { useTokenContext } from '#/context/token-context';
import { useLocation } from 'react-router-dom';
import GenerateSignInRedirect from '#/utils/generate-sign-in-redirect';

interface Props {
  children: React.ReactNode;
}

const Apollo = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const { token, setToken } = useTokenContext();

  const location = useLocation();
  const currentRoute = location.pathname;
  useEffect(() => {
    async function getSetToken() {
      console.log('getting token 2');

      const t = await getToken({
        leewayInSeconds: 1800,
        template: 'test',
      });
      if (!t && !isSignedIn) {
        navigate(GenerateSignInRedirect());
      }
      setToken(t);
    }

    if (!token) {
      void getSetToken();
    }
  }, [token]);

  const currentScheme = useStoreState((state) => state.scheme.id);
  const localLang = useStoreState((state) => state.theme.locale);

  const defaultHeaders = {
    type: 'clerk',
  };
  const httpLink = new BatchHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    batchMax: 1, // No more than 8 operations per batch
    batchInterval: 50, // Wait no more than 50ms after first batched operation
  });

  let activeSocket: WebSocket;
  let timedOut: number;

  const wsLink = new GraphQLWsLink(
    createClient({
      keepAlive: 10_000,
      on: {
        // eslint-disable-next-line no-return-assign
        connected: (socket) => (activeSocket = socket as WebSocket),
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
        closed: () => {
          clearTimeout(timedOut);
        },
        error: (error) => {
          console.error(`WebSocket error: ${error}`);
        },
      },
      url: import.meta.env.VITE_GRAPHQL_WS_URL,
      connectionParams: () => ({
        authorization: `Bearer ${token}`,
      }),
      lazy: true,
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
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors)
        // eslint-disable-next-line no-restricted-syntax
        for (const { message, locations, path, extensions } of graphQLErrors) {
          if (
            message.includes('USER_CONTEXT_ERROR') ||
            extensions?.code === '401'
          ) {
            const oldHeaders = operation.getContext().headers;
            console.log('getting token 1');
            void getToken({
              leewayInSeconds: 1800,
              skipCache: true,
              template: 'test',
            }).then((t) => {
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
            !message.startsWith('Not Auth') &&
            !message.startsWith('Not auth') &&
            !message.startsWith('USER_CONTEXT_ERROR')
          ) {
            Sentry.captureMessage(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                locations
              )}, Path: ${path}`
            );
          }
        }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
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
          http: { includeExtensions: true, includeQuery: false },
          headers: {
            ...headers,
            ...defaultHeaders,
            Authorization: initAuth ?? `Bearer ${token}`,
            language: localLang,
            currentScheme: currentScheme ?? null,
          },
        };
      } catch (error) {
        if (error instanceof Error) {
          // handle new token logic
        }
      }
    }
    return {
      ...context,
      http: { includeExtensions: true, includeQuery: false },
      headers: {
        ...headers,
        ...defaultHeaders,
        // eslint-disable-next-line quotes
        Authorization: initAuth ?? `Bearer ""`,
        language: localLang,
        currentScheme: currentScheme ?? null,
      },
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
    link,
    cache,
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
