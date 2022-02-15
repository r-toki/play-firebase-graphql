import "./firebaseApp";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthProvider } from "./context/Auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
