import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../user-contex";
import { toast } from "react-toastify";
import ReactHtmlParser from 'react-html-parser';
import WeatherCard from './WeatherCard'

import {
  Box,
  Grid,
  Typography,
  Divider,
  makeStyles,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Rating from "../Rating";
import DialogBox from "../DialogBox";
import BucketListBtn from "./BucketListBtn";
import EditMenu from './EditMenu';

import { deletePlace } from "../../services/place";
import axios from "axios";

const useStyles = makeStyles( (theme) => ({
  imageStyles: {
    height: "500px",
    width: "100%",
    objectFit: "contain",
  },
  displayPicture: {
    borderRadius: '50%',
    width: '30px',
  },
  authorTitle: {
    marginLeft: '10px',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500',
    [theme.breakpoints.down("xs")]: {
      fontSize: '12px',
    }
  },
  controlBtn: {
    height: '40px',
    width: '90px'
  },
  placeTitle: {
    fontSize: '1.7rem'
  },
}));

const PlaceDetailHeader = ({ data }) => {
  const history = useHistory();
  const [{ user: userInfo }] = useAuth();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xs"));
  const smMatches = useMediaQuery(theme.breakpoints.down("xs"));

  const [mutateDeletePlace] = useMutation(deletePlace, {
    onSuccess: () => {
      toast.warn("Place deleted successfully.");
      history.push("/");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const pushToEdit = () => history.push(`/place/edit/${data.id}`);

  // for dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    mutateDeletePlace(data.id);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box mb={4}>
      <DialogBox
        open={open}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        headerMessage="Delete this Place?"
        bodyMessage="You will not be able to recover this place. Are you sure you want to delete this place?"
      />
      <Grid container align="center" justify="center">
        <Grid item container>
          <Grid item xs={11}>
            <Typography
              color="primary"
              className={classes.placeTitle}
              align="left"
            >
              {data.name}
            </Typography>
          </Grid>

          {userInfo && userInfo.user.id === data.author.id && (
            <Grid item xs={1} justify="flex-end">
              <EditMenu handleDelete={handleClickOpen} handleEdit={pushToEdit} />
            </Grid>
          )}
        </Grid>

        <Grid item container xs={12} alignItems={matches? "center": "flex-end"} wrap="nowrap">
          <Grid item align="right">
            <img src={data.author.displayPicture} alt="Creator" className={classes.displayPicture}/>
          </Grid>
          <Grid item>
            <Typography className={classes.authorTitle} align="left">Created by {data.author.displayName}&nbsp;on {(new Date(data.createdAt)).toString().replace(" GMT+0545 (Nepal Time)", "")}</Typography>
          </Grid>
        </Grid>

        <Grid xs={12} style={{margin: '1.5rem'}}>
          <Divider style={{width: matches ? '97%' : '80%'}}/>
        </Grid>

        <Grid item container xs={12}>
          <Grid item xs={12} sm={4} align="left">
            <img
              src={data.image}
              alt={data.name}
              className={classes.imageStyles}
              style={{marginBottom: '10px'}}
            />
            <BucketListBtn
              inBucketList={data.inBucketList}
              placeId={data.id}
            />
          </Grid>
          <Grid item container xs={12} sm={8} spacing={1} direction="column" alignItems="flex-start" style={{  paddingLeft: smMatches ? '0' : '3rem' }}>
            <Grid item>
              <Typography
                variant="h5"
                color="secondary"
                align="left"
              >About {data.name}
              </Typography>
            </Grid>
            <Grid style={{width: '35%', marginBottom: '0.8rem'}}>
              <Divider style={{width: '100%'}}/>
            </Grid>
            <Grid item>
              <Typography variant="h6">Type: <span style={{ color: 'rgba(0,0,0,0.65)' }}>{data.type.charAt(0).toUpperCase() + data.type.slice(1)}</span></Typography>
            </Grid>
            <Grid item>
              <Rating
                rating={data.rating}
                numReviews={data.numReviews}
                fontSize="large"
                showNumberOfReviews={false}
              />
            </Grid>
            <Grid item align="left">
              {ReactHtmlParser(data.description)}
            </Grid>

          </Grid>
        </Grid>
        <Grid item container>
            <WeatherCard lat={data.location[0]} lon={data.location[1]}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceDetailHeader;
