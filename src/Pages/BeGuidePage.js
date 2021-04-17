import { useHistory } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Editor from "../Components/CreateReview/Editor";

import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  LinearProgress,
  InputAdornment,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import LoadingIndicator from "../Components/LoadingIndicator";

import { getUser } from "../services/user";
import { beGuide } from "../services/guide";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width: "50%",
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      padding: "1rem",
    },
  },
}));

const BeGuidePage = ({ location }) => {
  const redirect = location.search ? location.search.split("=")[1] : null;
  const history = useHistory();
  const classes = useStyles();

  const { isLoading, error, data } = useQuery("userInfo", getUser);


  const [beGuideMutation] = useMutation(beGuide, {
    onSuccess: () => {
      data.role !== "guide"
        ? toast.success("Congrats! You are a guide now.")
        : toast.info("Profile Updated");
      queryCache.refetchQueries("userInfo");
      if (redirect) history.push(redirect);
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  // const [description, setDescription] = useState(() => data ? (data.guideInfo ? data.guideInfo.description : "") : "");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if ( data && data.guideInfo ) {
      setDescription(data.guideInfo.description);
    }
  }, [data])

  if (isLoading) return <LoadingIndicator />;
  if (error) history.push("/error");

  const formInitValues = {
    instagram: data ? (data.guideInfo ? data.guideInfo.instagram : "") : "",
    facebook: data ? (data.guideInfo ? data.guideInfo.facebook : "") : "",
    twitter: data ? (data.guideInfo ? data.guideInfo.twitter : "") : "",
    linkedin: data ? (data.guideInfo ? data.guideInfo.linkedin : "") : ""
  };


  return (
    <Formik
      initialValues={formInitValues}
      // validationSchema={validator}
      onSubmit={async (values, { setSubmitting }) => {
        if ( description === "<p><br></p>" ){
          return toast.error("Please Enter Description");
        };
        console.log(description);
        await beGuideMutation({...values, description});
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Box mt={4}>
          <Grid container justify="center">
            <Paper className={classes.paperStyle}>
              <Grid container direction="column" justify="center" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4" align="center">
                    Guide Info
                  </Typography>
                </Grid>
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box >
                        <Typography variant="h6" style={{'color': 'rgba(0,0,0,0.65)'}}>Describe yourself as a guide</Typography>
                        <Editor {...{description, setDescription}} placeholder="Describe yourself as a guide"/>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box >
                        <Field
                          component={TextField}
                          variant="outlined"
                          label="facebook"
                          name="facebook"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FacebookIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box >
                        <Field
                          component={TextField}
                          variant="outlined"
                          name="instagram"
                          label="instagram"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <InstagramIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box >
                        <Field
                          component={TextField}
                          variant="outlined"
                          label="twitter"
                          name="twitter"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TwitterIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box >
                        <Field
                          component={TextField}
                          variant="outlined"
                          label="linkedin"
                          name="linkedin"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LinkedInIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>

                  {isSubmitting && <LinearProgress />}
                    <Grid item  xs={12}>
                      <Box mb={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={isSubmitting}
                          onClick={submitForm}
                        >
                          {data.role !== "guide" ? "submit" : "update"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      )}
    </Formik>
  );
};

export default BeGuidePage;
