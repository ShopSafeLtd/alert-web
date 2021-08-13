import React, { Component } from "react";
import * as Sentry from "@sentry/react";

// Apollo Imports
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split, from } from "apollo-link";
import { RetryLink } from "apollo-link-retry";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { persistCache } from "apollo-cache-persist";
import { onError } from "apollo-link-error";

class Apollo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      loaded: false,
    };
  }
  async componentDidMount() {
    // Init apollo client
    const wsLink = new WebSocketLink({
      uri: "wss://alert-api-dev.azurewebsites.net/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          Authorization:
            `Bearer ${localStorage.getItem("access_token")}` || null,
        },
      },
    });

    const httpLink = createUploadLink({
      //uri: 'https://alert-api-dev.azurewebsites.net/graphql'
      uri: "http://192.168.0.24:4000/graphql",
    });

    const middlewareLink = setContext(() => ({
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}` || null,
      },
    }));

    const authHttp = middlewareLink.concat(httpLink);

    const retry = new RetryLink({
      attempts: {
        max: Infinity,
      },
    });

    const splitLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      authHttp
    );

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach((error) => Sentry.captureException(error));

      if (networkError) Sentry.captureException(networkError);
    });

    const link = from([errorLink, retry, splitLink]);

    const cache = new InMemoryCache();

    const client = new ApolloClient({
      link,
      cache,
      connectToDevTools: true,
    });

    try {
      // See above for additional options, including other storage providers.
      await persistCache({
        cache,
        storage: window.localStorage,
      });
    } catch (error) {
      console.error("Error restoring Apollo cache", error);
    }

    this.setState({
      client,
      loaded: true,
    });
  }

  render() {
    const { client, loaded } = this.state;
    const { children } = this.props;
    return loaded ? (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    ) : (
      <div>loading cache...</div>
    );
  }
}

export default Apollo;
