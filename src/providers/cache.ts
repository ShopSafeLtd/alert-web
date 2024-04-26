/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import { InMemoryCache } from '@apollo/client';

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

const { cache } = (function () {
  const cache2 = new InMemoryCache({
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
  return {
    cache: cache2,
  };
})();

export { defaultFeedCacheMerge, cache };
