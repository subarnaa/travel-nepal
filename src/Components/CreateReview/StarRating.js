import { useState } from "react";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RatingIcon from "./RatingIcon";

const useStyles = makeStyles({
  boxStyle: {
    display: "flex",
  },
});

const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const classes = useStyles();

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index) => {
    setRating(index);
  };

  return (
    <Box className={classes.boxStyle} py={1}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <RatingIcon
            key={index}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        );
      })}
    </Box>
  );
};

export default StarRating;
