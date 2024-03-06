import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import App from "./App"
import { GoogleOAuthProvider } from '@react-oauth/google';
// import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="884563825180-ooksbq23dp34d4k1solc13lmjn5o6ooo.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);