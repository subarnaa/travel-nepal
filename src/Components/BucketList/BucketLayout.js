import { Box, Grid } from "@material-ui/core";

import BucketCard from "./BucketCard";

const BucketLayout = ({ bucketListItems }) => {
  return (
    <Box mt={6}>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={10} md={8}>
          <Grid container item spacing={2}>
            {bucketListItems.map((data) => (
              <Grid key={data.place.id} item xs={12} sm={6} md={4}>
                <BucketCard data={data} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BucketLayout;
