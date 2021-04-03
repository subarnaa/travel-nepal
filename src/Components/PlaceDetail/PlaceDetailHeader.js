import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../user-contex";
import { toast } from "react-toastify";
import ReactHtmlParser from 'react-html-parser';

import {
  Box,
  Grid,
  Typography,
  Divider,
  makeStyles,
  Button,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Rating from "../Rating";
import DialogBox from "../DialogBox";
import BucketListBtn from "./BucketListBtn";

import { deletePlace } from "../../services/place";

const useStyles = makeStyles({
  paperStyles: {
    padding: "2rem 3rem",
    margin: "1.5rem 0",
  },
  imageStyles: {
    height: "500px",
    width: "100%",
    objectFit: "contain",
  },
  description: {
    textAlign: "left",
  },
  displayPicture: {
    borderRadius: '50%',
    width: '30px',
  },
  authorTitle: {
    marginLeft: '10px',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500'
  },
  controlBtn: {
    height: '40px',
    width: '90px'
  },
});

const PlaceDetailHeader = ({ data }) => {
  const history = useHistory();
  const [{ user: userInfo }] = useAuth();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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
        <Grid container align="center" justify="space-evenly" spacing={2}>
          <Grid item xs={12} md={5} direction="column">
            <img
              src={data.image}
              alt={data.name}
              className={classes.imageStyles}
            />
          </Grid>
          <Grid container item xs={12} md={6} direction="column" spacing={2}>
            <Grid item container direction="row" alignItems="flex-end">
              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                style={{ marginBottom: "0" }}
                xs={8}
              >
                <Grid item container direction="column">
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.typographyStyles}
                    align="left"
                  >
                    {data.name}
                  </Typography>
                  <Grid item container direction="row" alignItems="flex-end">
                    <Grid itemjustify="flex-start">
                      <img src={data.author.displayPicture} alt="Creator" className={classes.displayPicture}/>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.authorTitle}>Created by {data.author.displayName}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{marginLeft: '0'}} className={classes.authorTitle}>&nbsp;  on {(new Date(data.createdAt)).toString().replace(" GMT+0545 (Nepal Time)", "")}</Typography>
                    </Grid>
                    {/* <AuthorTable data={data} classes={classes} /> */}
                  </Grid>
                </Grid>
              </Grid>
              {userInfo && userInfo.user.id === data.author.id && (
              <Grid item container style={{'width' : '170px'}} justify="space-between" xs={4}>
                  <Button className={classes.controlBtn} variant="outlined" color="secondary" size="medium" onClick={pushToEdit}>Edit</Button>
                  <Button className={classes.controlBtn} variant="outlined" color="secondary" size="medium" onClick={handleClickOpen}>Delete</Button>
              </Grid>
              )}
            </Grid>
            <Box>
              <Divider />
            </Box>
            <Grid
              item
              container
              justify="space-between"
              alignItems="center"
              style={{ margin: "0.5em 0" }}
            >
              <Grid item xs={8}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  align="left"
                >
                  {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={4} alignItems="flex-end">
                <BucketListBtn />
              </Grid>
            </Grid>
            <Divider style={{ marginBottom: "0.5em" }} />
            <Grid item mt={1}>
              <Rating
                rating={data.rating}
                numReviews={data.numReviews}
                fontSize="large"
              />
            </Grid>
            <Grid item align="left" style={{'marginTop' : '10px'}}>
              <Typography
                variant="h5"
                color="secondary"
                align="left"
              >About {data.name}
              </Typography>
              {ReactHtmlParser(data.description)}
            </Grid>

          </Grid>
        </Grid>
    </Box>
  );
};

export default PlaceDetailHeader;
