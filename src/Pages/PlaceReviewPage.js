import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuth } from "../user-contex";

import { Grid, Typography, Paper, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Review from "../Components/CreateReview/Review";
import LoadingIndicator from "../Components/LoadingIndicator";

import { getPlaceDetail } from "../services/place";
import { makeReview, editReview } from "../services/place";

const useStyles = makeStyles((theme) => ({
  reviewStyles: {
    width: "60%",
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      padding: "1rem",
    },
  },
  imageStyles: {
    width: "100%",
    height: "auto",
  },
}));

function PlaceReviewPlace({ match }) {
  const { id, action } = match.params;
  const [editable, setEditable] = useState(action === "edit" ? null : true);
  const [{ user }] = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // if action is other than write or edit, redirect
  useEffect(() => {
    if (action !== "write" && action !== "edit") history.push("/");
  }, [action, history]);

  const { isLoading, data } = useQuery(
    ["placeDetailReview", id],
    getPlaceDetail
  );

  // if user haven't review this place then redirect
  useEffect(() => {
    if (action === "edit" && data && user) {
      const review = data.reviews.find(
        (review) => review.user.id === user.user.id
      );

      if (!review) history.push(`/place/${id}`);
      setEditable(review);
    }
  }, [action, data, history, user, id]);

  if (isLoading || !data || !editable) return <LoadingIndicator />;

  return (
    <Box mx={matches ? 4 : 0} my={2}>
      <Grid container justify="center">
        <Paper className={classes.reviewStyles}>
          <Grid container justify="flex-start" spacing={2}>
            <Grid item xs={12} md={4}>
              <img
                src={data.image}
                alt={data.name}
                className={classes.imageStyles}
              />
            </Grid>
            <Grid item>
              <Typography variant={matches ? "h5" : "h6"}>
                {data.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {data.type}
              </Typography>
            </Grid>
          </Grid>
          <Box m={2}>
            <Divider />
          </Box>
          <Review
            id={id}
            reviewMethod={action === "write" ? makeReview : editReview}
            reviewAction={action}
            editData={editable}
          />
        </Paper>
      </Grid>
    </Box>
  );
}

export default PlaceReviewPlace;
