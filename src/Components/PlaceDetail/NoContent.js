import { Grid, makeStyles, Typography, Button} from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getUser } from "../../services/user";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    borderRadius: '5px',
    padding: '15px 10px',
    boxSizing: 'border-box',
  },
  imageContainer: {
    height: '30vh',
    width: '100%',
    objectFit: 'contain'
  },
}));

const NoContent = ({img, title, description, id, btnHandler, fullWidth=false }) => {
  const classes = useStyles();
  const { data: userInfo } = useQuery("userInfo", getUser);

  return (
    <Grid container className={classes.card}>
      <Grid item xs={12} sm={fullWidth ? 12 : 6} align="center">
        <img src={img} alt="title" className={classes.imageContainer}/>
      </Grid>
      <Grid item container xs={12} sm={6} direction="column" align="center" justify="center">
        <Grid item>
          <Typography variant='h5' style={{marginBottom: '10px'}}>{title}</Typography>
          <Typography variant='body1' style={{width: "90%", marginBottom: '10px'}}>{description}</Typography>
          {title === 'Be a Guide' ? userInfo && userInfo.role === 'guide' ?
            <Button
              variant="contained"
              color="primary"
              onClick={btnHandler}>
              Guide this Destination
            </Button>
            :
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/beguide?redirect=/place/${id}`}>Be a Guide
            </Button>
          :
            <Button
                component={Link}
                variant="contained"
                color="primary"
                to={`/place/${id}/write/review`}
            >
              Write a Review
            </Button>
          }
        </Grid>

      </Grid>
    </Grid>
  )
}

export default NoContent

