import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactHtmlParser from 'react-html-parser';

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Box, CardActionArea } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import Rating from "../Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px" ,
    minHeight: "440px",
    [theme.breakpoints.down("xs")]: {
      width: "94vw",
    },
  },

  media: {
    height: 200,
    width: "100%",
    objectFit: "cover",
  },
  icon: {
    color: red[400],
  },
  cardAction: {
    height: "440px",
    "&:hover": {
      backgroundColor: '#fcfffd'
    }
  },
  noMargin: {
    "& p": {
      marginTop: 0,
    },
  }
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1333 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1333, min: 1000 },
    items: 3,
  },
  tabletSec: {
    breakpoint: { max: 1000, min: 676 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 676, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CardSlider = ({ editorData }) => {
  const classes = useStyles();

  return (
    <Carousel responsive={responsive} swipeable infinite>
      {editorData.map((data) => (
        <Box key={data.id}>
          <Card className={classes.root}>
            <CardActionArea component={Link} to={`/place/${data.id}`} className={classes.cardAction}>
              <CardHeader title={data.name} subheader={data.type.charAt(0).toUpperCase() + data.type.slice(1)} />
              <CardMedia className={classes.media} image={data.image} />
              <CardContent>
                <Rating rating={data.rating} numReviews={data.numReviews} />
              </CardContent>
              <CardContent style={{ padding: '0 1rem', textAlign: 'left'}} className={classes.noMargin}>
                {console.log(data.description)}
                {ReactHtmlParser(data.description.slice(0,100).concat('...') )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Carousel>

  );
};

export default CardSlider;
