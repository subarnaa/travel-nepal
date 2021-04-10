import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactHtmlParser from "react-html-parser";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

import pattern from "../../statics/pattern.jpg";
import { getUser } from "../../services/user";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    width: "90%",
    minHeight: "400px",
    backgroundImage: `url(${pattern})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  icons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  cardAction: {
    marginTop: "auto",
  },
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const GuideCard = ({ data, userGuide, beGuideHandler, optOutHandler, id }) => {
  const { data: userInfo } = useQuery("userInfo", getUser);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box mb={4}>
      <Typography variant={matches ? "h4" : "h5"}>Guides</Typography>
      <Carousel responsive={responsive}>
        {data.map((guide) => (
          <Box key={guide.id} py={2} ml={2}>
            <Card className={classes.card}>
              <Box className={classes.center}>
                <Avatar
                  alt="Profile Image"
                  src={guide.displayPicture}
                  style={{ height: "90px", width: "90px" }}
                  className={classes.avatar}
                />
              </Box>
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {guide.displayName}
                </Typography>
                <Box align="center">
                  {ReactHtmlParser(guide.guideInfo.description)}
                </Box>
              </CardContent>
              <CardActions className={classes.cardAction}>
                <Box className={classes.icons}>
                  <IconButton
                    aria-label="mail"
                    component={Link}
                    to={{
                      pathname: `mailto:${guide.email}`,
                    }}
                    target="_blank"
                  >
                    <MailIcon style={{ fontSize: "40px" }} />
                  </IconButton>
                  {guide.guideInfo.facebook && (
                    <IconButton
                      aria-label="facebook"
                      component={Link}
                      to={{
                        pathname: guide.guideInfo.facebook,
                      }}
                      target="_blank">
                      <FacebookIcon style={{ fontSize: "40px" }} />
                    </IconButton>
                  )}
                  {guide.guideInfo.instagram && (
                    <IconButton
                      aria-label="instagram"
                      component={Link}
                      to={{
                        pathname: guide.guideInfo.instagram,
                      }}
                      target="_blank"
                    >
                      <InstagramIcon style={{ fontSize: "40px" }} />
                    </IconButton>
                  )}
                  {guide.guideInfo.linkedin && (
                    <IconButton
                      aria-label="linkedin"
                      component={Link}
                      to={{
                        pathname: guide.guideInfo.linkedin,
                      }}
                      target="_blank"
                    >
                      <LinkedInIcon style={{ fontSize: "40px" }} />
                    </IconButton>
                  )}
                  {guide.guideInfo.twitter && (
                    <IconButton
                      aria-label="twitter"
                      component={Link}
                      to={{
                        pathname: guide.guideInfo.twitter,
                      }}
                      target="_blank"
                    >
                      <TwitterIcon style={{ fontSize: "40px" }} />
                    </IconButton>
                  )}
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Carousel>
      <Box my={2} ml={2}>
        {userInfo && userInfo.role === "guide" ? (
          userGuide ? (
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={optOutHandler}
            >
              Remove me as a guide
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={beGuideHandler}
            >
              Guide this place
            </Button>
          )
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
      </Box>
    </Box>
  );
};

export default GuideCard;
