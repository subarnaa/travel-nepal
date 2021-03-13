import { Box, Grid } from "@material-ui/core";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ currentReviews, placeId }) => {
  return (
    <Grid container>
      <Grid item container direction="column" xs={12}>
        {currentReviews.map((review) => (
          <Box key={review.id}>
            <ReviewCard
              comment={review.comment}
              rating={review.rating}
              createdAt={review.createdAt}
              user={review.user}
              img={review.img}
              title={review.title}
              placeId={placeId}
            />
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default ReviewList;
