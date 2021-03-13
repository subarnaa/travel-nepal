import { Link } from "react-router-dom";

import {
  Paper,
  Grid,
  Box,
  Typography,
  Hidden,
  Button,
} from "@material-ui/core";

const AlternateCard = ({ img, title, body, btn, btnLink, dir = "row" }) => {
  const styles = {
    searchContainer: {
      height: "40vh",
      backgroundImage: `url(${img})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
  };

  return (
    <Box mb={4} style={{ width: "750px", margin: "0 auto 48px auto;" }}>
      <Paper style={{ padding: "20px" }}>
        <Grid container spacing={5} direction={dir}>
          <Grid
            item
            container
            xs={12}
            sm={6}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Box mb={2}>
                <Typography align="center" variant="h5">
                  {title}
                </Typography>
                <Typography align="center" variant={"body1"}>
                  {body}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to={btnLink}
                variant="contained"
                color="primary"
              >
                {btn}
              </Button>
            </Grid>
          </Grid>
          <Hidden xsDown>
            <Grid item xs={6}>
              <Box style={styles.searchContainer}></Box>
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AlternateCard;
