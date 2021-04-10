import React from 'react';
import { getUserPlaces } from '../services/place';
import UserPlace from '../Components/UserPlaces/UserPlaces';
import { useQuery } from 'react-query';
import LoadingIndicator from '../Components/LoadingIndicator'
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const MyPlaces = () => {
  const { isLoading, data } = useQuery(
    "userPlaces",
    getUserPlaces
  );

  if (isLoading) return <LoadingIndicator />;

  let placeCards = null;

  if ( data.length > 0 ) {
    placeCards = data.map((place, index) => {
      return(
        <UserPlace
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
          <Typography variant="h4">You have not added any places till now.</Typography>
          <Typography variant="body1">Contribute to the travel community by sharing your travel experiences.</Typography>
          <Box mt={1}>
            {/* <Typography variant="body1">Click the button below to contribute.</Typography> */}
            <Button
              component={Link}
              to='/contribute'
              variant="contained"
              color="primary"
            >
              Contribute Now!
            </Button>
          </Box>
        </Box>
      </Paper>

    )
  }

  return (
    <Grid container style={{marginTop: '20px', maxWidth: '100%'}} direction="column" justify="center" alignItems="center" spacing={2}>
      {data.length > 0 ?
        <Typography variant="h3">Your Places</Typography> : ''
      }
      <Grid item container spacing={4} alignContent="center" justify="center" style={{width: 'fit-content'}}>
        {placeCards}
      </Grid>
    </Grid>
  )
}

export default MyPlaces

