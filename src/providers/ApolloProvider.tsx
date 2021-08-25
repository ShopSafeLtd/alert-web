import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
} from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";

import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createUploadLink } from "apollo-upload-client";

import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";

interface Props {
  children: React.ReactNode;
}

const Apollo = ({ children }: Props) => {
  const accessToken = localStorage.getItem("accessToken");

  const wsClient = new SubscriptionClient(
    "wss://alert-api-dev.azurewebsites.net/graphql",
    {
      reconnect: true,
      connectionParams: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  const wsLink = new WebSocketLink(wsClient);

  const httpLink = createUploadLink({
    //uri: 'https://alert-api-dev.azurewebsites.net/graphql'
    uri: "http://192.168.0.24:4000/graphql",
  });

  const middlewareLink = setContext((_, { headers, ...context }) => {
    const accessToken = localStorage.getItem("accessToken");
    return {
      headers: {
        ...headers,
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
      ...context,
    };
  });

  const authHttp = middlewareLink.concat(httpLink);

  const link = split(
    ({ query }) => {
      // @ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
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
    const removeRecycledItems = (data = []) => {
      return data.filter((el: any) => !readField("recycled", el));
    };
    const existingData = removeRecycledItems(existing) || [];
    const incomingData = removeRecycledItems(incoming) || [];

    if (!args?.after) return [...incomingData];

    const existingIds = existing.map((el: any) => readField("id", el));
    const newItems = incoming.filter(
      (el: any) => !existingIds.includes(readField("id", el))
    );
    return [...existingData, ...newItems];
  };

  const cache = new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          schemes: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          chats: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          groups: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Group: {
        fields: {
          users: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Chat: {
        fields: {
          members: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
      Query: {
        fields: {
          incidentFeed: {
            keyArgs: [
              "schemeId",
              "userId",
              "order",
              "search",
              "crimeTypes",
              "groups",
              "approved",
            ],
            merge(existing, incoming, { readField, args }) {
              return defaultFeedCacheMerge(existing, incoming, readField, args);
            },
          },
          offenderFeed: {
            keyArgs: [
              "schemeId",
              "userId",
              "order",
              "search",
              "groups",
              "tags",
              "ethnicity",
              "sex",
              "approved",
            ],
            merge(existing, incoming, { readField, args }) {
              return defaultFeedCacheMerge(existing, incoming, readField, args);
            },
          },
          offenders: {
            keyArgs: ["schemeId", "order", "search", "groups"],
            merge(existing, incoming, { readField, args }) {
              return defaultFeedCacheMerge(existing, incoming, readField, args);
            },
          },
          recycledItems: {
            keyArgs: ["schemeId"],
            merge(existing, incoming, { readField, args }) {
              let existingIds: any[] = [];
              let newExisting: any[] = [];
              let newItems: any[] = [];
              if (!!existing) {
                existingIds = existing.map((el: any) => readField("id", el));
                newExisting = existing;
              }
              if (!!incoming)
                newItems = incoming.filter(
                  (el: any) => !existingIds.includes(readField("id", el))
                );

              const newOutput = [...newExisting, ...newItems];
              const defaultOutput = [...incoming];

              return !!args!.after ? [...newOutput] : [...defaultOutput];
            },
          },
          users: {
            keyArgs: ["id"],
            merge(existing = [], incoming: any[]) {
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
