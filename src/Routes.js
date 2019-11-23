import React from "react";
import { Route, Switch } from "react-router-dom";
import Dash from "./components/dash/Dash";
import TotalExpenses from "./components/expenses/TotalExpenses";
import PropExpenses from "./components/expenses/PropExpenses";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import AddExpense from "./components/expenses/AddExpense";

export default function Routes() {
  return (
    <Switch>
      <Route path="/dash" component={Dash} />
      <Route path="/add/expense/:propId" component={AddExpense} />
      <Route path="/expenses" component={TotalExpenses} />
      <Route path="/property/expenses/:propId" component={PropExpenses} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
}
