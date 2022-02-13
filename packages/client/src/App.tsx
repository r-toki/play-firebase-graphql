import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from "@apollo/client";
import { ReactNode, VFC } from "react";

import { GRAPHQL_ENDPOINT } from "./constants";
import { HelloDocument } from "./graphql/generated";

type ApolloClientWithTokenProps = {
  children: ReactNode;
};

const ApolloClientWithToken: VFC<ApolloClientWithTokenProps> = ({ children }) => {
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

gql`
  query hello {
    hello
  }
`;

const Hello: VFC = () => {
  const { loading, error, data } = useQuery(HelloDocument);
  const hello = data?.hello;
  return <div>{hello}</div>;
};

const App: VFC = () => {
  return (
    <ApolloClientWithToken>
      <Hello />
    </ApolloClientWithToken>
  );
};

export default App;
