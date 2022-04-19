import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import "./index.css";

import store, { history } from "@Root/store";
import App from "@Components/App";
import "@Assets/css/bootstrap.min.css";
import "@Assets/css/bootstrap-select.min.css";
import "@Assets/css/responsive.css";
import "@Assets/css/style.css";

const mountRoot = document.getElementById("app");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  mountRoot
);
