import React from "react";
import MainPage from "./pages/MainPage";
import { Route, Redirect } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import "./styles/App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#da9432",
    },
    secondary: {
      main: "#4591af",
    },
  },
  typography: {
    fontFamily: `"Lora", "serif"`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Route path='/' component={MainPage} />
        <Redirect to='/users' component={MainPage} />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default App;
