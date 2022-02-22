import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode, useEffect, useMemo, VFC } from "react";

import { GRAPHQL_ENDPOINT } from "../constants";
import { useAuth } from "./Auth";

const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

const useApolloClientWithTokenContainer = () => {
  const { token } = useAuth();

  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      }),
    [token]
  );

  const client = useMemo(
    () =>
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
          typePolicies: {
            Query: {
              fields: {
                feed: {
                  keyArgs: false,
                  merge(existing, incoming) {
                    if (existing) {
                      return {
                        ...incoming,
                        edges: [...existing.edges, ...incoming.edges],
                      };
                    } else {
                      return {
                        ...incoming,
                      };
                    }
                  },
                },
              },
            },
          },
        }),
      }),
    [authLink]
  );

  useEffect(() => {
    console.log("initialized ApolloClient!");
  }, [client]);

  return client;
};

type ApolloWithTokenProviderProps = {
  children: ReactNode;
};

export const ApolloWithTokenProvider: VFC<ApolloWithTokenProviderProps> = ({ children }) => {
  const client = useApolloClientWithTokenContainer();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
