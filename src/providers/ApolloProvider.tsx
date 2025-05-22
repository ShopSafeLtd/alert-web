/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
import type { FetchResult, Operation } from '@apollo/client';
import type { ClientOptions } from 'graphql-sse';

import { useTokenContext } from '#/context/token-context';
import { getCustomUrls } from '#/providers/GetCustomUrls';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { cache } from '#/providers/cache';
import { useStoreState } from '#/state';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  Observable,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth } from '@clerk/clerk-react';
import * as Sentry from '@sentry/react';
import { SentryLink } from 'apollo-link-sentry';
import { sha256 } from 'crypto-hash';
import { print } from 'graphql';
import { createClient } from 'graphql-sse';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

// Function-based version of SSELink (no classes)
export function createSSELink(options: ClientOptions): ApolloLink {
  const client = createClient(options);
  return new ApolloLink(
    (operation: Operation) =>
      new Observable<FetchResult>((sink) =>
        client.subscribe<FetchResult>(
          { ...operation, query: print(operation.query) },
          {
            complete: sink.complete.bind(sink),
            error: sink.error.bind(sink),
            next: sink.next.bind(sink),
          }
        )
      )
  );
}

const defaultHeaders = {
  type: 'clerk',
  'x-graphql-client-name': 'web',
  'x-graphql-client-version': '1.1.0',
};

const Apollo = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const { customUrl, customWsUrl } = getCustomUrls();
  const { getToken } = useTokenContext();

  const location = useLocation();
  const currentRoute = location.pathname;

  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const localLang = useStoreState((state) => state.theme.locale);

  const client = useMemo(() => {
    // HTTP transport
    const httpLink = new HttpLink({
      uri: customUrl,
    });

    // Error reporting
    const errorLink = onError(
      ({ forward, graphQLErrors, networkError, operation }) => {
        if (graphQLErrors) {
          for (const {
            extensions,
            locations,
            message,
            path,
          } of graphQLErrors) {
            const lowerCaseMessage = message.toLowerCase();

            if (
              lowerCaseMessage.includes('user_context') ||
              extensions?.code === '401'
            ) {
              const oldHeaders = operation.getContext().headers;
              return new Observable<FetchResult>((observer) => {
                getToken(true)
                  .then((t) => {
                    if (!t && !isSignedIn) {
                      navigate(
                        currentRoute && currentRoute.includes('sign-in')
                          ? '/sign-in'
                          : `/sign-in?rd=${currentRoute}`
                      );
                      observer.complete();
                      return;
                    }
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${t}`,
                      },
                    });
                    const subscriber = forward(operation).subscribe({
                      complete: () => observer.complete(),
                      error: (err) => observer.error(err),
                      next: (result) => observer.next(result),
                    });
                    // Cleanup function
                    return () => {
                      if (subscriber.unsubscribe) subscriber.unsubscribe();
                    };
                  })
                  .catch((error) => {
                    observer.error(error);
                  });
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
        }

        if (networkError) {
          console.error(`[Network error]: ${networkError}`);
          if ('statusCode' in networkError) {
            console.log(`Status code: ${networkError.statusCode}`);
          }
          if ('bodyText' in networkError) {
            console.log(`Body: ${networkError.bodyText}`);
          }
          if ('statusCode' in networkError && networkError.statusCode === 401) {
            navigate(
              currentRoute && currentRoute.includes('sign-in')
                ? '/sign-in'
                : `/sign-in?rd=${currentRoute}`
            );
          }
          Sentry.captureException(networkError);
        }
      }
    );

    // Async auth link: inject fresh token per request
    const authLink = setContext(async (_, { headers, ...context }) => {
      const t = await getToken();
      return {
        ...context,
        headers: {
          ...headers,
          ...defaultHeaders,
          Authorization: t ? `Bearer ${t}` : `Bearer ""`,
          currentScheme: currentScheme ?? null,
          language: localLang,
        },
        http: { includeExtensions: true, includeQuery: false },
      };
    });

    // Persisted queries
    const persistedQueryLink = createPersistedQueryLink({ sha256 });

    // SSE transport with dynamic headers
    const sseLink = createSSELink({
      headers: async () => {
        const t = await getToken();
        return {
          ...defaultHeaders,
          'X-GraphQL-Event-Stream-Token': `Bearer ${t}`,
          authorization: `Bearer ${t}`,
          currentScheme: currentScheme ?? null,
          language: localLang,
        };
      },
      url: customWsUrl,
    });
    const sentryLink = new SentryLink();

    // Compose links: subscriptions vs HTTP
    const authHttp = sentryLink
      // eslint-disable-next-line unicorn/prefer-spread
      .concat(errorLink)
      // eslint-disable-next-line unicorn/prefer-spread
      .concat(authLink)
      // eslint-disable-next-line unicorn/prefer-spread
      .concat(persistedQueryLink)
      // eslint-disable-next-line unicorn/prefer-spread
      .concat(httpLink);

    const splitLink = split(
      ({ query }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      sseLink,
      authHttp
    );

    return new ApolloClient({
      cache,
      connectToDevTools: !import.meta.env.PROD,
      link: splitLink,
    });
  }, [getToken, currentScheme, localLang]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
