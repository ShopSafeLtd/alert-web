/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';

import type { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import { useAuth0 } from '@auth0/auth0-react';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import * as Sentry from '@sentry/react';
import { SentryLink } from 'apollo-link-sentry';
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

  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
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
            timedOut = setTimeout(() => {
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
        Sentry.captureException(networkError);
      }
    }
  );

  const middlewareLink = setContext(async (_, { headers, ...context }) => {
    if (isAuthenticated) {
      try {
        const authToken = await getNewToken();
        return {
          headers: {
            ...headers,
            Authorization: authToken ? `Bearer ${authToken}` : '',
            currentScheme,
            language: localLang,
          },
          ...context,
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
      headers: {
        ...headers,
        Authorization: `Bearer ''`,
        language: localLang,
      },
      ...context,
    };
  });

  // const middlewareLink = setContext((_, { headers, ...context }) => ({
  //   headers: {
  //     ...headers,
  //     ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
  //   },
  //   ...context,
  // }));

  const authHttp = sentryLink
    // eslint-disable-next-line unicorn/prefer-spread
    .concat(errorLink)
    // eslint-disable-next-line unicorn/prefer-spread
    .concat(middlewareLink)
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

  const defaultFeedCacheMerge = (
    existing: any,
    incoming: any,
    readField: ReadFieldFunction,
    args: Record<string, any> | null
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    const removeRecycledItems = (data = []) =>
      data.filter((el: any) => !readField('recycled', el));
    const existingData = removeRecycledItems(existing) || [];
    const incomingData = removeRecycledItems(incoming) || [];

    if (!args?.after) return [...incomingData];

    const existingIds = new Set(existing.map((el: any) => readField('id', el)));
    const newItems = incoming.filter(
      (el: any) => !existingIds.has(readField('id', el))
    );
    return [...existingData, ...newItems];
  };

  const cache = new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          schemes: {
            // eslint-disable-next-line @typescript-eslint/default-param-last
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          chats: {
            // eslint-disable-next-line @typescript-eslint/default-param-last
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          groups: {
            // eslint-disable-next-line @typescript-eslint/default-param-last
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Group: {
        fields: {
          users: {
            // eslint-disable-next-line @typescript-eslint/default-param-last
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Chat: {
        fields: {
          members: {
            // eslint-disable-next-line @typescript-eslint/default-param-last
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Query: {
        fields: {
          incidentFeed: {
            keyArgs: [
              'schemeId',
              'userId',
              'order',
              'search',
              'crimeTypes',
              'groups',
              'approved',
            ],
            merge(existing, incoming, { readField, args }) {
              return defaultFeedCacheMerge(existing, incoming, readField, args);
            },
          },
          offenderFeed: {
            keyArgs: [
              'schemeId',
              'userId',
              'order',
              'search',
              'groups',
              'tags',
              'ethnicity',
              'sex',
              'approved',
            ],
            merge(existing, incoming, { readField, args }) {
              return defaultFeedCacheMerge(existing, incoming, readField, args);
            },
          },
          offenders: {
            keyArgs: ['schemeId', 'order', 'search', 'groups'],
            merge(existing, incoming, { readField, args }) {
              return defaultFeedCacheMerge(existing, incoming, readField, args);
            },
          },
          recycledItems: {
            keyArgs: ['schemeId'],
            merge(existing, incoming, { readField, args }) {
              let existingIds: any[] = [];
              let newExisting: any[] = [];
              let newItems: any[] = [];
              if (existing) {
                existingIds = existing.map((el: any) => readField('id', el));
                newExisting = existing;
              }
              if (incoming)
                newItems = incoming.filter(
                  (el: any) => !existingIds.includes(readField('id', el))
                );

              const newOutput = [...newExisting, ...newItems];
              const defaultOutput = [...incoming];

              return args?.after ? [...newOutput] : [...defaultOutput];
            },
          },
          users: {
            keyArgs: ['id'],
            // eslint-disable-next-line @typescript-eslint/default-param-last
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          messages: {
            keyArgs: ['where'],
            merge(existing, incoming, { readField, args }) {
              if (existing) {
                const existingIds = new Set(
                  existing.map((el: any) => readField('id', el))
                );

                return [
                  ...existing,
                  ...incoming.filter(
                    (el: any) => !existingIds.has(readField('id', el))
                  ),
                ];
                // return [...incoming]
              }
              return [...incoming];
            },
          },
          chatMessages: {
            keyArgs: ['where'],
            merge(existing, incoming, { readField, args }) {
              if (existing && args?.skip) {
                const existingIds = new Set(
                  existing.map((el: any) => readField('id', el))
                );

                return [
                  ...existing,
                  ...incoming.filter(
                    (el: any) => !existingIds.has(readField('id', el))
                  ),
                ];
                // return [...incoming]
              }
              return [...incoming];
            },
          },
        },
      },
    },
  });

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
