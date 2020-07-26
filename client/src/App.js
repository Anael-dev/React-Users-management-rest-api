import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/users' component={MainPage} />
    </Switch>
  );
};

export default App;
