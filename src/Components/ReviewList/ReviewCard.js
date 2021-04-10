import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, queryCache } from "react-query";
import ReactHtmlParser from "react-html-parser";
import { useAuth } from "../../user-contex";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { CardActions, IconButton, Typography, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";

import Rating from "../Rating";
import DialogBox from "../DialogBox";

import { deleteReview } from "../../services/place";
import EditMenu from '../PlaceDetail/EditMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  media: {
    height: "250px",
    width: "100%",
  },
  icon: {
    color: red[400],
  },
  typo: {
    marginBottom: "0.5rem",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default function ReviewCard({
  createdAt,
  comment,
  rating,
  img,
  user,
  title,
  placeId,
  reviewId,
  showNumberofReviews=true,
}) {
  const history = useHistory();
  const [{ user: userInfo }] = useAuth();
  const classes = useStyles();

  const [mutateDeleteReview] = useMutation(deleteReview, {
    onSuccess: () => {
      queryCache.refetchQueries("placeDetail");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const pointToEdit = () => history.push(`/place/${placeId}/edit/review`);

  // for dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    mutateDeleteReview({placeId, reviewId});
    toast.warning("review deleted");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Card className={classes.root} style={{"margin" : "0 auto"}}>
        <Box className={classes.header}>
          <CardHeader
            avatar={<Avatar src={user.displayPicture} />}
            title={user.displayName}
            subheader={(new Date(createdAt)).toString()}
          />
          {userInfo && userInfo.user.id === user.id && (
            <EditMenu handleEdit={pointToEdit} handleDelete={handleClickOpen}/>
          )}
        </Box>
        {img && (
          <CardMedia className={classes.media} image={img} alt="user img" />
        )}
        <CardContent>
          <Rating rating={rating} showNumberofReviews={false}/>
          {title && (
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          )}

          {ReactHtmlParser(comment)}
        </CardContent>
        {userInfo && userInfo.user.id === user.id && (
          <CardActions disableSpacing>
            <IconButton aria-label="edit review" onClick={pointToEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete review" onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>

      <DialogBox
        open={open}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        headerMessage="Delete Review?"
        bodyMessage="You'll not be able to recover this review. Do you want to continue?"
      />
    </Box>
  );
}
