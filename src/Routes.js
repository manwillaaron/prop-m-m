import React from "react";
import { Route, Switch } from "react-router-dom";
import Dash from "./components/dash/Dash";
// import TotalExpenses from './components/expenses/TotalExpenses'
// import PropExpenses from './components/expenses/PropExpenses'
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Header from "./components/header/Header";

export default function Routes() {
  return (
    <Switch>
      <Route
        path="/dash"
        component={() => (
          <>
            <Header />
            <Dash />
          </>
        )}
      />
      {/* <Route path='/expenses/:id' component={TotalExpenses} /> */}
      {/* <Route path='/expenses' component={TotalExpenses} /> */}
      {/* <Route path='/property/expenses' component={PropExpenses} /> */}
      <Route
        path="/login"
        component={() => (
          <>
            <Header />
            <Login />
          </>
        )}
      />
      <Route
        path="/signup"
        component={() => (
          <>
            <Header />
            <Register />
          </>
        )}
      />
      <Route
        path="/"
        exact
        component={() => (
          <>
            <Header />
            <Home />
          </>
        )}
      />
    </Switch>
  );
}
