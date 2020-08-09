import React from "react";
import MainPage from "./pages/MainPage";
import { Switch, Route, Redirect } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
