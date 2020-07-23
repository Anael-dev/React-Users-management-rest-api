import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../styles/App.css";
import MainPage from "./MainPage";

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={MainPage}>
        <Redirect to='/users/default' />
      </Route>
      <Route path='/users' component={MainPage} />
    </Switch>
  );
};

export default App;
