import { createMuiTheme } from '@material-ui/core';
import {grey, blueGrey, red, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[600],
    },
    secondary: {
      main: red[500],
    }
  }
});

export default theme;
