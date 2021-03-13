import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import InfoBox from "../Components/InfoBox";

import error from "../statics/error.svg";

const createMessage = (matches) => {
  return (
    <>
      <Typography variant={matches ? "h5" : "body1"} align="center">
        Sorry,Something went wrong
      </Typography>
      <Typography variant={matches ? "body1" : "body2"} align="center">
        Please try again after a while
      </Typography>
    </>
  );
};

const ErrorPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const message = createMessage(matches);
  return <InfoBox image={error} message={message} />;
};

export default ErrorPage;
