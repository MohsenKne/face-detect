import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { storageHelper } from "./helpers";
import { createApiInterface } from "./api";
import { createStore } from "./store/store";

const getToken = () => {
  const apiToken = storageHelper.getApiToken();
  return apiToken ? "Token " + apiToken : null;
};

const api = createApiInterface({
  getToken: () => getToken(),
});

const store = createStore({
  thunkArguments: {
    api,
  },
});

function renderApp({ App }) {
  const rootElement = document.getElementById("root");

  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    rootElement
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

renderApp({ App });
