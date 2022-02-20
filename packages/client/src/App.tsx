import { VFC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ApolloWithTokenProvider } from "./context/ApolloWithToken";
import { useAuth } from "./context/Auth";
import { paths, routes } from "./routes";
import { Compose } from "./routes/middleware";

const App: VFC = () => {
  const authState = useAuth();
  return authState.initialized ? (
    <ApolloWithTokenProvider>
      <BrowserRouter>
        <Routes>
          {paths.map((path) => {
            const { Component, middleware } = routes[path];
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Compose components={middleware}>
                    <Component />
                  </Compose>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </ApolloWithTokenProvider>
  ) : null;
};

export default App;
