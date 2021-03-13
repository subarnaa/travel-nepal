import { Grid, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarHalfRoundedIcon from "@material-ui/icons/StarHalfRounded";

const Rating = ({ rating, numReviews, fontSize = "small" }) => {
  const isFloat = function (n) {
    return parseInt(n) !== n;
  };

  if (typeof rating !== "number") {
    return null;
  }

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        {/* number of full stars */}
        {[...Array(Math.floor(rating))].map((_, index) => (
          <StarRoundedIcon
            key={index}
            fontSize={fontSize}
            style={{ color: green[500] }}
          />
        ))}

        {/* add halfstar if needed */}
        {isFloat(rating) && (
          <StarHalfRoundedIcon
            style={{ color: green[500] }}
            fontSize={fontSize}
          />
        )}

        {/* remaining empty star out of 5 */}
        {[...Array(5 - Math.ceil(rating))].map((_, index) => (
          <StarBorderRoundedIcon
            key={index}
            style={{ color: green[500] }}
            fontSize={fontSize}
          />
        ))}
      </Grid>
      {numReviews !== 0 && (
        <Grid item>
          {numReviews && (
            <Typography>
              {numReviews}
              {numReviews < 2 ? " review" : " reviews"}
            </Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Rating;
