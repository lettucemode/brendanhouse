import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { UserProvider } from "./util/auth";
import { BrowserRouter } from "react-router-dom";

Amplify.configure(config);

declare global {
  interface Window {
    Square: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
