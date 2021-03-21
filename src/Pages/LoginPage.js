import { Link as RouterLink } from "react-router-dom";

import { Grid, Typography, Button, Link, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GTranslate } from "@material-ui/icons/";

import LoginForm from "../Components/LoginForm";
import DividerWithText from "../Components/DividerWithText";

const useStyles = makeStyles({
  paperStyles: {
    padding: "2rem 3rem",
    marginTop: "1.5rem",
  },
  loginStyles: {
    marginTop: "2rem",
  },
  forgot: {
    color: "darkblue",
    textDecorationColor: "darkblue",
  },
});

const Login = () => {
  const classes = useStyles();

  const handleGoogleOauth = () => {
    window.location.href = "http://localhost:4000/api/auth/google"
      // process.env.REACT_APP_ENV === "development"
      //   ? "http://localhost:4000/api/auth/google"
      //   : "http://app.vnepal.me/api/auth/google";
  };

  return (
    <>
      <Grid
        className={classes.loginStyles}
        container
        justify="center"
        alignContent="center"
      >
        <Grid item xs={10} md={5} lg={4}>
          <Paper className={classes.paperStyles}>
            <Box mb={3} fontWeight="fontWeightBold">
              <Typography variant="h5" component="h1" align="center">
                Hey!
              </Typography>
              <Typography component="h2" align="center" color="textSecondary">
                Let's get back to exploring!
              </Typography>
            </Box>
            <Box mb={2}>
              <Button
                onClick={handleGoogleOauth}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<GTranslate />}
                fullWidth
              >
                Continue with Google
              </Button>
            </Box>
            <Box mb={3} mt={3}>
              <DividerWithText>
                <Typography>Or</Typography>
              </DividerWithText>
            </Box>

            <Box xs={3}>
              <LoginForm />
            </Box>

            <Link to={`/password/request`} component={RouterLink} className={classes.forgot}>
              <Typography align="center">Forgot Password?</Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
