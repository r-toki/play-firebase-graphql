import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from "@apollo/client";
import { ReactNode, VFC } from "react";

import { GRAPHQL_ENDPOINT } from "./constants";
import { GoodbyeDocument, HelloDocument } from "./graphql/generated";

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

  query goodbye {
    hello
  }
`;

const Hello: VFC = () => {
  const { data: hello } = useQuery(HelloDocument);
  const { data: goodbye } = useQuery(GoodbyeDocument);
  return (
    <div>
      <div>{hello?.hello}</div>
      <div>{goodbye?.hello}</div>
    </div>
  );
};

const App: VFC = () => {
  return (
    <ApolloClientWithToken>
      <Hello />
    </ApolloClientWithToken>
  );
};

export default App;
