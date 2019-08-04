import React from "react";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import CustomView from "./components/CustomView/CustomView";
import Home from "./components/Home/Home";
import AuthContainer from "./components/Auth/AuthContainer";
import userFetch from "./hooks/fetchUser";

import "./App.scss";

function App() {
  userFetch("/api/user");
  const user = useSelector(state => state.user);
  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Layout flexDirection="column" className="home-container">
                    <Home />
                  </Layout>
                );
              }}
            />
            <Route
              path="/page1"
              render={() => {
                return (
                  <Layout flexDirection="column" className="home-container">
                    <CustomView page="1" />
                  </Layout>
                );
              }}
            />
            <Route
              path="/page2"
              render={() => {
                return (
                  <Layout flexDirection="column" className="home-container">
                    <CustomView page="2" />
                  </Layout>
                );
              }}
            />
            <Route
              path="/page3"
              render={() => {
                return (
                  <Layout flexDirection="column" className="home-container">
                    <CustomView page="3" />
                  </Layout>
                );
              }}
            />
          </Switch>
        </>
      ) : (
        <AuthContainer />
      )}
    </div>
  );
}

export default App;
