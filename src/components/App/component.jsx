import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import asyncComponent from "@Components/AsyncComponent";
import Loading from "react-fullscreen-loading";

import { history } from "../../store";

import Header from "@Components/Header";

export default function App(props) {
  useEffect(() => {
    if (sessionStorage.getItem("registerDetails")) {
      let temp = JSON.parse(sessionStorage.getItem("registerDetails"));
      props.updateFromStorage(temp);
    }
  }, []);

  return (
    <div className="app-container">
      <Header />

      <Loading loading={true} background="#000" loaderColor="#3498db" />
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            component={asyncComponent(() => import("@Scenes/UserProfileList"))}
          />
          <Route
            exact
            path="/user/addUser"
            component={asyncComponent(() => import("@Scenes/UserProfile"))}
          />
          <Route
            exact
            path="/user/editUser"
            component={asyncComponent(() => import("@Scenes/UserProfile"))}
          />
        </Switch>
      </Router>
    </div>
  );
}
