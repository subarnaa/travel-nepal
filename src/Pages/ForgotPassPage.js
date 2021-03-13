import { Grid, Paper, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ForgotPassForm from "../Components/ForgotPassForm";

const useStyles = makeStyles({
  paperStyles: {
    padding: "2rem 3rem",
    marginTop: "1.5rem",
  },
  loginStyles: {
    marginTop: "2rem",
  },
});

const ForgotPassPage = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.loginStyles}
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={10} md={6} lg={5}>
        <Paper className={classes.paperStyles}>
          <Box mb={2} fontWeight="fontWeightBold">
            <Typography variant="h5" component="h1" align="center">
              Recover your password
            </Typography>
            <Typography component="h2" align="center" color="textSecondary">
              Tell us the email address associated with your account, and we’ll
              send you a password reset token.
            </Typography>
          </Box>
          <Box mb={2}>
            <ForgotPassForm />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassPage;
