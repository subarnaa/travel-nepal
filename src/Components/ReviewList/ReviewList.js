import { Box, Grid } from "@material-ui/core";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ currentReviews, placeId }) => {
  return (
    <Grid container>
      <Grid item container direction="column" xs={12}>
        {currentReviews.map((review) => {
          console.log(placeId, 'placeId')
          return (
          <Box key={review.id}>
            <ReviewCard
              comment={review.comment}
              rating={review.rating}
              createdAt={review.createdAt}
              user={review.user}
              img={review.img}
              title={review.title}
              reviewId={review.id}
              placeId={placeId}
              showNumberofReviews={false}
            />
          </Box>
        )})}
      </Grid>
    </Grid>
  );
};

export default ReviewList;
