/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createUploadLink } from 'apollo-upload-client';

import type { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import { useAuth0 } from '@auth0/auth0-react';
import { onError } from '@apollo/client/link/error';

import * as Sentry from '@sentry/react';
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
    });

  const currentScheme = useStoreState((state) => state.scheme.id);
  const wsClient = new SubscriptionClient(
    import.meta.env.VITE_GRAPHQL_WS_URL,
    // "wss://alert-api-dev.azurewebsites.net/graphql",
    // 'wss://alert-dev-api.herokuapp.com/graphql',
    // 'ws://localhost:4000/graphql',
    {
      reconnect: true,
      timeout: 20_000,
      connectionParams: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  const wsLink = new WebSocketLink(wsClient);

  const httpLink = createUploadLink({
    // uri: "https://alert-api-dev.azurewebsites.net/graphql",
    // uri: "https://alert-api-dev-development.azurewebsites.net/graphql",
    // uri: 'http://localhost:4000/graphql',
    // uri: 'https://alert-dev-api.herokuapp.com/graphql',
    uri: import.meta.env.VITE_GRAPHQL_URL,
  });

  // TODO: Add error handling
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors)
        // eslint-disable-next-line no-restricted-syntax
        for (const { message, locations, path, extensions } of graphQLErrors) {
          if (
            message.startsWith('USER_CONTEXT_ERROR') ||
            extensions?.code === '401'
          ) {
            const oldHeaders = operation.getContext().headers;
            getNewToken().then((token) => {
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
          Sentry.captureMessage(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations
            )}, Path: ${path}`
          );
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
          },
          ...context,
        };
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'login_required') {
            if (localStorage.getItem('logo')?.endsWith('.webp')) {
              loginWithRedirect({
                'ext-logo': localStorage.getItem('logo'),
              });
            } else {
              loginWithRedirect();
            }
          }
          if (error.message === 'consent_required') {
            if (localStorage.getItem('logo')?.endsWith('.webp')) {
              loginWithRedirect({
                'ext-logo': localStorage.getItem('logo'),
              });
            } else {
              loginWithRedirect();
            }
          }
        }
      }
    }
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ''`,
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
  // eslint-disable-next-line unicorn/prefer-spread
  const authHttp = errorLink.concat(middlewareLink).concat(httpLink);

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
