import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperStyles: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    margin: "auto",
    marginTop: "6rem",
    padding: "1rem",
  },
  loginStyles: {
    marginTop: "2rem",
  },
}));

const InfoBox = ({ image, message }) => {
  const classes = useStyles();

  const styles = {
    searchContainer: {
      height: "50vh",
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
  };

  return (
    <Box>
      <Paper className={classes.paperStyles}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Box mb={2}>{message}</Box>
          </Grid>

          <Grid item xs={12}>
            <Box style={styles.searchContainer}></Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default InfoBox;
