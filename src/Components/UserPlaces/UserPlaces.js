import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from "react";
import { deletePlace } from '../../services/place';
import { useHistory } from 'react-router-dom';
import DialogBox from '../DialogBox';
import { useMutation } from 'react-query'

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

const UserPlaces = ({data}) => {
  const classes = useStyles();

  const history = useHistory();

  //dialogbox controls
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    mutateDeletePlace(data.id);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    console.log("Hello");
    setOpen(true);
  };

  //delete place handler
  const [mutateDeletePlace] = useMutation(deletePlace, {
    onSuccess: () => {
      toast.warn("Place Deleted Succussfully");
      history.push("/myplaces");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  return (
    <Grid item>
      <DialogBox
        open={open}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        headerMessage="Delete this Place?"
        bodyMessage="You will not be able to recover this place. Are you sure about this action?"
      />
      <Card className={classes.root}>
        <CardActionArea component={Link} to={`/place/${data.id}`}>
          <CardMedia
            className={classes.media}
            image={data.image}
            title={data.name}
          />
          <CardContent style={{paddingBottom: '0'}}>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            {data.description.length > 10
              ? ReactHtmlParser(data.description.slice(0, 150).concat("..."))
              : ReactHtmlParser(data.description)}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" component={Link}i to={`/place/${data.id}/edit`}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default UserPlaces;
