/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ApolloClient, ApolloProvider, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth0 } from '@auth0/auth0-react';
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

interface Props {
  children: React.ReactNode;
}

const Apollo = ({ children }: Props): JSX.Element => {
  const accessToken = localStorage.getItem('accessToken');

  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const getNewToken = async () =>
    getAccessTokenSilently({
      audience: `https://app.shopsafealert.co.uk`,
      scope: 'openid read:current_user',
    }).catch((error) => {
      if (error === 'login_required') {
        if (localStorage.getItem('logo')?.endsWith('.webp')) {
          void loginWithRedirect({
            'ext-logo': localStorage.getItem('logo'),
          });
        } else {
          void loginWithRedirect();
        }
      }
    });

  const currentScheme = useStoreState((state) => state.scheme.id);
  const localLang = useStoreState((state) => state.theme.locale);
  // const wsClient = new SubscriptionClient(
  //   import.meta.env.VITE_GRAPHQL_WS_URL,
  //   // "wss://alert-api-dev.azurewebsites.net/graphql",
  //   // 'wss://alert-dev-api.herokuapp.com/graphql',
  //   // 'ws://localhost:4000/graphql',
  //   {
  //     reconnect: true,
  //     // timeout: 20_000,
  //     connectionParams: {
  //       ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
  //     },
  //   }
  // );

  // const wsLink = new WebSocketLink(wsClient);
  //
  // function fetchWithTimeout(uri, options = {}, time): Promise<Response> {
  //   return new Promise((resolve, reject) => {
  //     const timer = setTimeout(() => {
  //       reject(new Error('Request timed out.'));
  //     }, time);
  //     fetch(uri, options).then(
  //       (response) => {
  //         clearTimeout(timer);
  //         resolve(response);
  //       },
  //       (error) => {
  //         clearTimeout(timer);
  //         reject(error);
  //       }
  //     );
  //   });
  // }

  // const httpLink = new HttpLink({
  //   uri: import.meta.env.VITE_GRAPHQL_URL,
  //   // fetch: (uri, options) => {
  //   //   const timeoutFromHeader = options?.headers?.['x-timeout'];
  //   //   const timeout = timeoutFromHeader || 1;
  //   //   return fetchWithTimeout(uri, options, timeout);
  //   // },
  // });
  const httpLink = new BatchHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    batchMax: 8, // No more than 8 operations per batch
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
          if (error === 'Login required') {
            if (localStorage.getItem('logo')?.endsWith('.webp')) {
              void loginWithRedirect({
                'ext-logo': localStorage.getItem('logo'),
              });
            } else {
              void loginWithRedirect();
            }
          }
          console.error(`WebSocket error: ${error}`);
        },
      },
      url: import.meta.env.VITE_GRAPHQL_WS_URL,
      connectionParams: async () => {
        const token = await getNewToken();
        return {
          authorization: `Bearer ${token}`,
        };
      },
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
            void getNewToken().then((token) => {
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `bearer ${token}`,
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

  const middlewareLink = setContext(async (_, { headers, ...context }) => {
    if (isAuthenticated) {
      try {
        const authToken = await getNewToken();
        return {
          ...context,
          http: { includeExtensions: true, includeQuery: false },
          headers: {
            ...headers,
            Authorization: authToken ? `Bearer ${authToken}` : '',
            language: localLang,
            currentScheme: currentScheme ?? null,
          },
        };
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'login_required') {
            if (localStorage.getItem('logo')?.endsWith('.webp')) {
              void loginWithRedirect({
                'ext-logo': localStorage.getItem('logo'),
              });
            } else {
              void loginWithRedirect();
            }
          }
          if (error.message === 'consent_required') {
            if (localStorage.getItem('logo')?.endsWith('.webp')) {
              void loginWithRedirect({
                'ext-logo': localStorage.getItem('logo'),
              });
            } else {
              void loginWithRedirect();
            }
          }
        }
      }
    }
    return {
      ...context,
      http: { includeExtensions: true, includeQuery: false },
      headers: {
        ...headers,
        Authorization: `Bearer ''`,
        language: localLang,
        currentScheme: currentScheme ?? null,
      },
    };
  });

  // const middlewareLink = setContext((_, { headers, ...context }) => ({
  //   headers: {
  //     ...headers,
  //     ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
  //   },
  //   ...context,
  // }));

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

  // (async () => {
  //   await persistCache({
  //     cache,
  //     storage: window.localStorage,
  //   });
  // })();

  const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
