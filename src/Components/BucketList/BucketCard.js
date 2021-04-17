import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { queryCache, useMutation } from "react-query";
import { toast } from "react-toastify";

import { updateBucketItem } from "../../services/bucketlist";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    minHeight: '420px',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  media: {
    height: 225,
  },
}));

const BucketCard = ({ data }) => {
  const classes = useStyles();

  const [updateBucketListMutation] = useMutation(updateBucketItem, {
    onSuccess: () => {
      toast.success("action sucessful");
      queryCache.refetchQueries("bucketListItems");
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
      <Card className={classes.root}>
        <CardActionArea component={Link} to={`/place/${data.place.id}`}>
          <CardMedia
            className={classes.media}
            image={data.place.image}
            title={data.place.name}
          />
          <CardContent style={{paddingBottom: '0'}}>
            <Typography gutterBottom variant="h5" component="h2">
              {data.place.name}
            </Typography>
            {data.place.description.length > 150
              ? ReactHtmlParser(data.place.description.slice(0, 150).concat("..."))
              : ReactHtmlParser(data.place.description)}
          </CardContent>
        </CardActionArea>
        <CardActions>
        {data.status ? (
          <Button
            size="small"
            color="secondary"
            fullWidth
            onClick={() =>
              updateBucketListMutation({ id: data.place.id, status: false })
            }
          >
            Mark Incomplete
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            fullWidth
            onClick={() =>
              updateBucketListMutation({ id: data.place.id, status: true })
            }
          >
            Mark Complete
          </Button>
        )}
      </CardActions>
      </Card>
    </Grid>
  );
};

export default BucketCard;
