/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
} from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';

import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createUploadLink } from 'apollo-upload-client';

import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  children: React.ReactNode;
}

const Apollo = ({ children }: Props): JSX.Element => {
  const accessToken = localStorage.getItem('accessToken');
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const wsClient = new SubscriptionClient(
    // "wss://alert-api-dev.azurewebsites.net/graphql",
    // 'wss://alert-dev-api.herokuapp.com/graphql',
    'ws://localhost:4000/graphql',
    {
      reconnect: true,
      connectionParams: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  const wsLink = new WebSocketLink(wsClient);

  const httpLink = createUploadLink({
    // uri: "https://alert-api-dev.azurewebsites.net/graphql",
    // uri: "https://alert-api-dev-development.azurewebsites.net/graphql",
    uri: 'http://localhost:4000/graphql',
    // uri: 'https://alert-dev-api.herokuapp.com/graphql',
  });

  const middlewareLink = setContext(async (_, { headers, ...context }) => {
    if (isAuthenticated) {
      const authToken = await getAccessTokenSilently({
        audience: `https://app.shopsafealert.co.uk`,
        scope: 'openid read:current_user',
      });
      return {
        headers: {
          ...headers,
          Authorization: authToken ? `Bearer ${authToken}` : '',
        },
        ...context,
      };
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

  const authHttp = middlewareLink.concat(httpLink);

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
  ) => {
    const removeRecycledItems = (data = []) =>
      data.filter((el: any) => !readField('recycled', el));
    const existingData = removeRecycledItems(existing) || [];
    const incomingData = removeRecycledItems(incoming) || [];

    if (!args?.after) return [...incomingData];

    const existingIds = existing.map((el: any) => readField('id', el));
    const newItems = incoming.filter(
      (el: any) => !existingIds.includes(readField('id', el))
    );
    return [...existingData, ...newItems];
  };

  const cache = new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          schemes: {
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          chats: {
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          groups: {
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Group: {
        fields: {
          users: {
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Chat: {
        fields: {
          members: {
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
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
    },
  });

  (async () => {
    await persistCache({
      cache,
      storage: window.localStorage,
    });
  })();

  const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
