import { Link as RouterLink } from "react-router-dom";

import { Typography, Link } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import InfoBox from "../Components/InfoBox";

import empty from "../statics/empty.svg";

const createMessage = (matches) => {
  return (
    <>
      <Typography variant={matches ? "h5" : "body1"} align="center">
        Sorry, Your Bucketlist is currently empty
      </Typography>
      <Typography variant={matches ? "body1" : "body2"} align="center">
        You can find destinations in the{" "}
        <Link to={`/explore`} component={RouterLink}>
          Explore{" "}
        </Link>
        page
      </Typography>
    </>
  );
};

const EmptyBucketListPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const message = createMessage(matches);
  return <InfoBox image={empty} message={message} />;
};

export default EmptyBucketListPage;
