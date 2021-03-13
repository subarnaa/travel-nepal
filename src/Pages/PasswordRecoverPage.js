import { Link as RouterLink } from "react-router-dom";

import { Typography, Link } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import InfoBox from "../Components/InfoBox";

import reset from "../statics/reset.svg";

const createMessage = (matches) => {
  return (
    <>
      <Typography variant={matches ? "h5" : "body1"} align="center">
        The password was reset sucessfully
      </Typography>
      <Typography variant={matches ? "body1" : "body2"} align="center">
        you can now{" "}
        <Link to={`/login`} component={RouterLink}>
          login
        </Link>{" "}
        with the new password
      </Typography>
    </>
  );
};

const PasswordRecoverPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const message = createMessage(matches);
  return <InfoBox image={reset} message={message} />;
};

export default PasswordRecoverPage;
