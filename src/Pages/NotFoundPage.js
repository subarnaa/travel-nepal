import { Link as RouterLink } from "react-router-dom";

import { Typography, Link } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import InfoBox from "../Components/InfoBox";

import empty from "../statics/empty_street.svg";

const createMessage = (matches) => {
  return (
    <>
      <Typography variant={matches ? "h5" : "body1"} align="center">
        Sorry, We could not find the destination
      </Typography>
      <Typography variant={matches ? "body1" : "body2"} align="center">
        Please be more specific or{" "}
        <Link to={`/contribute`} component={RouterLink}>
          contribute
        </Link>
      </Typography>
    </>
  );
};

const NotFoundPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const message = createMessage(matches);
  return <InfoBox image={empty} message={message} />;
};

export default NotFoundPage;
