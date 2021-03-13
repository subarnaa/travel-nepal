import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { green } from "@material-ui/core/colors";

function RatingIcon(props) {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      {hoverRating >= index ? (
        <StarRoundedIcon fontSize="large" style={{ color: green[500] }} />
      ) : !hoverRating && rating >= index ? (
        <StarRoundedIcon fontSize="large" style={{ color: green[500] }} />
      ) : (
        <StarBorderRoundedIcon fontSize="large" style={{ color: green[500] }} />
      )}
    </div>
  );
}

export default RatingIcon;
