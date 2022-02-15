import { VFC } from "react";

import { ApolloWithTokenProvider } from "./context/ApolloWithToken";
import { useAuth } from "./context/Auth";
import { Index } from "./pages";

const App: VFC = () => {
  const authState = useAuth();
  return authState.initialized ? (
    <ApolloWithTokenProvider>
      <Index />
    </ApolloWithTokenProvider>
  ) : null;
};

export default App;
