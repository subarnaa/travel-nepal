import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { makeStyles } from "@material-ui/core/styles";
import LoadingIndicator from "../Components/LoadingIndicator";

import { getAllBucketList } from "../services/bucketlist";
import { Box, Button, ButtonGroup, Grid, Paper, Typography } from "@material-ui/core";
import BucketCard from "../Components/BucketList/BucketCard"
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  stickToBottom: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 2,
    maxWidth: 500,
  },
  root: {
    width: 345,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  media: {
    height: 225,
  },
});

const BucketList = () => {
  const classes = useStyles();
  const [selectedCat, setCat] = useState("all");
  const [places, setPlaces] = useState([]);

  const { isLoading, data } = useQuery("bucketListItems", getAllBucketList, {
    onSuccess: (data) => setPlaces(data),
  });

  useEffect(() => {
    if(data){
      if (selectedCat === "all") return setPlaces(data);
      const filteredPlaces = data.filter(place => place.status === selectedCat);
      setPlaces(filteredPlaces);
    }
  }, [data, selectedCat])

  if (isLoading || !data) return <LoadingIndicator />;

  let placeCards = null;

  if ( places.length > 0 ) {
    placeCards = places.map((place, index) => {
      return(
        <BucketCard
          data={place}
          key={index}
        />
      )
    });
  } else if (data.length > 0 && places.length < 1) {
    placeCards= <Typography variant="h5" style={{marginTop: '2rem'}}>There are no items in this list.</Typography>
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
              to='/explore'
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
      {data.length > 0 ?
      <div>
        <Typography variant="h3">Your Places</Typography>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button size="large" onClick={() => setCat("all")}>All</Button>
          <Button size="large" onClick={() => setCat(true)}>Completed</Button>
          <Button size="large" onClick={() => setCat(false)}>Incomplete</Button>
         </ButtonGroup>
      </div>
      : ''
      }
      <Grid item container spacing={4} alignContent="center" justify="center" style={{width: 'fit-content'}}>
        {placeCards}
      </Grid>
    </Grid>
  );
};

export default BucketList;
