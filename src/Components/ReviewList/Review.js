import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Hidden,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import ReviewList from "./ReviewList";

import reviewImg from "../../statics/review.jpg";

const styles = {
  searchContainer: {
    height: "40vh",
    backgroundImage: `url(${reviewImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
};

const Review = ({ reviews, id }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const indexOfLastReview = currentPage * postsPerPage;
  const indexOfFirstReview = indexOfLastReview - postsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Box
        mb={4}
        width="100%"
        bgcolor="white.500"
        border={1}
        borderColor="grey.300"
        style={{padding: matches ? '25px' : '10px'}}

      >
        <Box mb={4} minWidth="250px">
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant={matches ? "h4" : "h5"}>Reviews</Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                variant="contained"
                color="primary"
                size={matches ? "large" : "medium"}
                to={`/place/${id}/write/review`}
              >
                Write a Review
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box mb={4}>
          <Divider />
        </Box>
        {reviews.length > 0 && (
          <Box mb={2}>
            <ReviewList currentReviews={currentReviews} placeId={id} />
          </Box>
        )}
        {reviews.length !== 0 && (
          <Pagination
            color="primary"
            count={Math.ceil(reviews.length / postsPerPage)}
            page={currentPage}
            onChange={(_event, pnumber) => setCurrentPage(pnumber)}
          />
        )}
      </Box>
    </Grid>
  );
};

export default Review;
