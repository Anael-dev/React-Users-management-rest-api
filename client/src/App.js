import React from "react";
import MainPage from "./pages/MainPage";
import { Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from '@date-io/moment';

import "./styles/App.css";

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/users' component={MainPage} />
      </Switch>
    </MuiPickersUtilsProvider>
  );
};

export default App;
