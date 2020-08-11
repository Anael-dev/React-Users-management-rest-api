import React from "react";
import MainPage from "./pages/MainPage";
import { Route, Redirect } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "./styles/App.css";

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Route path='/' component={MainPage} />
      <Redirect to='/users' component={MainPage} />
    </MuiPickersUtilsProvider>
  );
};

export default App;
