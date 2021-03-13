import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import "fontsource-roboto";
import { UserProvider } from "./user-contex";
import App from "./App";
import theme from "./theme"

ReactDOM.render(
  <CssBaseline>
    <UserProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </UserProvider>
  </CssBaseline>,
  document.getElementById("root")
);
