import { useQuery, useMutation, queryCache } from "react-query";
import { toast } from "react-toastify";

import PlaceDetailHeader from "../Components/PlaceDetail/PlaceDetailHeader";
import PlaceDetailMap from "../Components/PlaceDetail/PlaceDetailMap";
import NoGuide from "../Components/PlaceDetail/NoGuide";
import Review from "../Components/ReviewList/Review";
import LoadingIndicator from "../Components/LoadingIndicator";
import GuideCard from "../Components/PlaceDetail/GuideCard";

import NotFoundPage from "./NotFoundPage";

import { getPlaceDetail } from "../services/place";
import { guidePlace, guideOptOut } from "../services/guide";
import { makeStyles, Paper, Grid } from "@material-ui/core"
import NoContent from '../Components/PlaceDetail/NoContent';
import noguide from '../statics/noguide.jpg'
import noreview from '../statics/review.jpg'

const useStyles = makeStyles((theme) => ({
  paperStyles: {
    padding: "2rem 3.5rem",
    margin: "1.5rem 3.5rem",
    [theme.breakpoints.down("md")]: {
      margin: "1.5rem 1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 1.5rem",
      margin: "1.5rem 0.5rem",
    }
  },
  zeroContent: {
    minHeight: '250px',
  },
}));

const PlaceDetail = ({ match }) => {
  const classes = useStyles();
  const { id } = match.params;
  const { isLoading, data, error } = useQuery(
    ["placeDetail", id],
    getPlaceDetail,
    {
      retry: false,
    }
  );

  const [beGuideMutation] = useMutation(guidePlace, {
    onSuccess: () => {
      queryCache.refetchQueries("placeDetail");
      toast.success("You are now a guide for this place.");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const [guideOptOutMutation] = useMutation(guideOptOut, {
    onSuccess: () => {
      queryCache.refetchQueries("placeDetail");
      toast.warning("You are no longer a guide for this place.");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const beGuideHandler = () => beGuideMutation(data.id);
  const optOutHandler = () => guideOptOutMutation(data.id);

  if (error) return <NotFoundPage />;

  if (isLoading || !data) return <LoadingIndicator />;

  return (
    <Paper className={classes.paperStyles}>
      <Grid container>
        <Grid item xs={12}>
          <PlaceDetailHeader data={data} />
        </Grid>
        <Grid item xs={12}>
          <PlaceDetailMap location={data.location} />
        </Grid>
        <Grid item container xs={12} spacing={4}>
          {data.guides.length > 0 && (
            <Grid item xs={data.guides.length > 0 ? 12 : 6}>
                <GuideCard
                  data={data.guides}
                  userGuide={data.userGuide}
                  beGuideHandler={beGuideHandler}
                  optOutHandler={optOutHandler}
                  id={id}
                />
            </Grid>
          )}
          {data.reviews.length > 0 &&
            <Grid item xs={12} className={classes.zeroContent}>
              <Review reviews={data.reviews} id={id} />
            </Grid>
          }
          <Grid item container xs={12} spacing={3} style={{width : '100%'}}>
            <Grid item xs={12} md={data.guides.length > 0? 12 : 6}>
              <NoContent
                title="No Reviews Yet"
                description="Be the first to review this place."
                img={noreview}
                id={id}
                userRole={data.user}
              />
            </Grid>
            { data.guides.length === 0 &&
              <Grid item xs={12} md={data.reviews.length > 0 ? 12: 6}>
                <NoContent
                  title="Be a Guide"
                  description="We coud not find any guides for this destination. Do you want to be one?"
                  img={noguide}
                  id={id}
                  btnHandler={beGuideHandler}
                  userRole={data.user}
                />
              </Grid>
            }
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default PlaceDetail;
