import { Grid, Paper, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ResetPassForm from "../Components/ResetPassForm";

const useStyles = makeStyles({
  paperStyles: {
    padding: "2rem 3rem",
    marginTop: "1.5rem",
  },
  loginStyles: {
    marginTop: "2rem",
  },
});

const ResetPassPage = ({ match }) => {
  const { id } = match.params;
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
              Reset Password
            </Typography>
          </Box>
          <Box mb={2}>
            <ResetPassForm id={id} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassPage;
