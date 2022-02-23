import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { last, orderBy, uniqBy } from "lodash-es";
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
                    console.log("--- existing ---");
                    console.log(existing);
                    console.log("--- incoming ---");
                    console.log(incoming);
                    console.log("");
                    if (!existing) return incoming;
                    const edges = orderBy(
                      uniqBy([...existing.edges, ...incoming.edges], (v) => v.node.__ref),
                      (v) => v.cursor,
                      "desc"
                    );
                    const endCursor = last(edges).cursor;
                    return {
                      ...incoming,
                      edges,
                      pageInfo: {
                        ...incoming.pageInfo,
                        endCursor,
                      },
                    };
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
