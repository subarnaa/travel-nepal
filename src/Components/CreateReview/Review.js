import { useState } from "react";
import { useMutation, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Box,
  Grid,
  Typography,
  Button,
  LinearProgress,
  TextField,
  IconButton,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import Editor from "./Editor";
import StarRating from "./StarRating";

import app from "../../firebase";

const Review = ({ id, reviewMethod, reviewAction, editData }) => {
  const history = useHistory();

  const [rating, setRating] = useState(() => editData.rating || 0);
  const [description, setDescription] = useState(() => editData.comment || "");
  const [title, setTitle] = useState(() => editData.title || "");
  const [file, setFile] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const [mutateMakeReview] = useMutation(reviewMethod, {
    onSuccess: () => {
      queryCache.refetchQueries("placeDetailReview");
      toast.info(
        reviewAction === "write"
          ? "review added sucessfully"
          : "review edited sucessfully"
      );
      history.push(`/place/${id}`);
    },

    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const uploadImage = async (img) => {
    try {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(img.name+ new Date().getTime());
      await fileRef.put(img);
      return fileRef.getDownloadURL();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async () => {
    setSubmitting(true);
    const reviewToAdd = { rating };
    if (description !== "") {
      reviewToAdd.comment = description;
    }
    if (file) {
      const uploadedImg = await uploadImage(file);
      reviewToAdd.img = uploadedImg;
    }
    if (title !== "") {
      reviewToAdd.title = title;
    }
    await mutateMakeReview({ id, review: { ...reviewToAdd } });
    setSubmitting(false);
  };

  const chooseFile = ({ target }) => setFile(target.files[0]);

  return (
    <Box mt={2}>
      <Box>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="body1" color="secondary">
              Rate your experience
            </Typography>

            <StarRating {...{ rating, setRating }} />
          </Grid>
          <Grid item>
            <Box textAlign="center">
              <Typography variant="body1" color="secondary">
                Upload a photo
              </Typography>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                hidden
                onChange={chooseFile}
              />
              <label htmlFor="contained-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </label>
              {file && <Typography>{file.name}</Typography>}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" color="secondary">
            Give your review a title
          </Typography>
          <Box mt={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" color="secondary">
            Leave a review
          </Typography>
          <Editor {...{ description, setDescription }} />
        </Grid>

        <Grid item>
          <Box>
            {isSubmitting && <LinearProgress />}
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              disabled={isSubmitting}
              onClick={handleReviewSubmit}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Review;
