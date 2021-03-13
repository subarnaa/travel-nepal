import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useAuth } from "../user-contex";

import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ContributeForm from "../Components/Contribute/ContributeForm";
import LoadingIndicator from "../Components/LoadingIndicator";

import { editPlace } from "../services/place";
import { getPlaceDetail } from "../services/place";

const useStyles = makeStyles((theme) => ({
  paperStyles: {
    padding: "2rem 3rem",
    [theme.breakpoints.down("md")]: {
      padding: "1rem 1rem",
    },
    margin: "1.5rem 0",
  },
  loginStyles: {
    marginTop: "2rem",
    [theme.breakpoints.down("md")]: {
      padding: "1rem 1rem",
    },
  },
}));

const EditPlace = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();
  const [{ user: userInfo }] = useAuth();
  const [editable, setEditable] = useState(false);
  const classes = useStyles();

  const { isLoading, data } = useQuery(["placeDetail", id], getPlaceDetail);

  // if user is not author to this place then redirect
  useEffect(() => {
    if (data && userInfo) {
      if (data.author.id !== userInfo.user.id) {
        history.push(`/place/${id}`);
      }
      setEditable(true);
    }
  }, [userInfo, data, history, id]);

  if (isLoading || !data || !editable) return <LoadingIndicator />;

  return (
    <Grid
      className={classes.loginStyles}
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={12} md={6}>
        <Paper className={classes.paperStyles}>
          <Box mb={2} fontWeight="fontWeightBold">
            <Typography variant="h5" component="h1" align="center">
              Contribute
            </Typography>
            <Typography component="h2" align="center" color="textSecondary">
              Share your secrets!
            </Typography>
          </Box>

          <ContributeForm placeData={data} placeEdit={editPlace} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditPlace;
