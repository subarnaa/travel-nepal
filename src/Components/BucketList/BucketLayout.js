import { Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import BucketCard from "./BucketCard";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 410,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  media: {
    height: 225,
  },
});

const BucketLayout = ({ bucketListItems }) => {
  let placeCards = null;

  if ( bucketListItems.length > 0 ) {
    placeCards = bucketListItems.map((place, index) => {
      return(
        <BucketCard
          data={place}
          key={index}
        />
      )
    });
  } else {
    placeCards =
    (
      <Paper style={{ marginTop: '15vh' }}>
        <Box textAlign="center" m={4}>
          <Typography variant="h4">You do not have any places in your bucketlist.</Typography>
          <Typography variant="body1">Start exploring and find your new destination.</Typography>
          <Box mt={1}>
            <Button
              component={Link}
              to='/contribute'
              variant="contained"
              color="primary"
            >
              Start Exploring!
            </Button>
          </Box>
        </Box>
      </Paper>
    )
  }

  return (
    <Grid container style={{marginTop: '20px', maxWidth: '100%'}} direction="column" justify="center" alignItems="center" spacing={2}>
      {bucketListItems.length > 0 ?
        <Typography variant="h3">Your Places</Typography> : ''
      }
      <Grid item container spacing={4} alignContent="center" justify="center" style={{width: 'fit-content'}}>
        {placeCards}
      </Grid>
    </Grid>
  );
};

export default BucketLayout;
