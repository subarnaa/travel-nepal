import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "../Rating";
import { queryCache, useMutation } from "react-query";
import { toast } from "react-toastify";

import { updateBucketItem } from "../../services/bucketlist";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 200,
    width: "100%",
    objectFit: "cover",
  },
  content: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }
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
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/place/${data.place.id}`}>
        <CardHeader
          title={
            data.place.name.length > 20
              ? data.place.name.slice(0, 20).concat("...")
              : data.place.name
          }
          subheader={data.place.type}
        />
        <CardMedia className={classes.media} image={data.place.image} />
      </CardActionArea>
      <CardContent>
        <Rating rating={data.place.rating} numReviews={data.place.numReviews} />
        <Typography variant="body2" color="textSecondary" component="p" className={classes.content}>
          {data.place.description}
        </Typography>
      </CardContent>
      <CardActions>
        {data.status ? (
          <Button
            size="small"
            color="secondary"
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
            onClick={() =>
              updateBucketListMutation({ id: data.place.id, status: true })
            }
          >
            Mark Complete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BucketCard;
