import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@material-ui/core";

import missing from "../../statics/noguide.jpg";
import { getUser } from "../../services/user";

const styles = {
  contributeContainer: {
    height: "30vh",
    backgroundImage: `url(${missing})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
};

const NoGuide = ({ beGuideHandler, id }) => {
  const { data: userInfo } = useQuery("userInfo", getUser);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box mb={4}>
      <Paper>
        <Grid container>
          <Hidden xsDown>
            <Grid item xs={6}>
              <Box style={styles.contributeContainer}></Box>
            </Grid>
          </Hidden>
          <Grid
            item
            container
            xs={12}
            sm={6}
            direction="column"
            spacing={2}
            justify="center"
            alignItems="center"
            style={{ padding: "20px" }}
          >
            <Grid item>
              <Typography align="center" variant="h5">
                No Guides available
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center">
                We coud not find any guides for this destination. Do you want to
                be one?
              </Typography>
            </Grid>
            <Grid item>
              {userInfo && userInfo.role === "guide" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={beGuideHandler}
                >
                  Guide this Destination
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/beguide?redirect=/place/${id}`}
                >
                  Be a guide
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NoGuide;
