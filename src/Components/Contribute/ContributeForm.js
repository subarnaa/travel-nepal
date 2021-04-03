import { useState } from "react";
import { useMutation, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Box,
  MenuItem,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Select } from "formik-material-ui";

import ContributeMap from "./ContributeMap";
import PlacesSearch from "./PlacesSearch";
import UploadButton from "./UploadButton";

import app from "../../firebase";
import { addPlace } from "../../services/place";
import Editor from '../CreateReview/Editor';

const validator = yup.object({
  name: yup.string().required(),
  // description: yup.string().required(),
});

const useStyles = makeStyles({
  textFeildStyles: {
    width: "100%",
  },
});

const ContributeForm = ({ placeData = {}, placeEdit }) => {
  const history = useHistory();
  const [location, setLocation] = useState(
    () => placeData.location || [27.7172, 85.324]
  );
  const classes = useStyles();

  const uploadImage = async (img) => {
    try {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(img.name+Date.now());
      await fileRef.put(img);
      return fileRef.getDownloadURL();
    } catch (error) {
      console.log(error);
    }
  };

  const [description, setDescription] = useState("");

  const mutateAction = placeEdit || addPlace;

  const [mutatePlaces] = useMutation(mutateAction, {
    onSuccess: (data) => {
      queryCache.refetchQueries("placeDetail");
      toast.success(placeEdit ? "Location Edited Successfully!" : "Location Added Successfully!");
      history.push(`/place/${data.id}`);
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  return (
    <Formik
      initialValues={{
        name: placeData.name || "",
        description: placeData.description || "",
        type: placeData.type || "landmark",
        location: placeData.location || [27.7172, 85.324],
        img: null,
        image: placeData.image || null,
      }}
      validationSchema={validator}
      onSubmit={async (values, { setSubmitting }) => {
        // while adding values.imgage will be null
        if (!values.image) {
          if (values.img) {
            const uploadedImg = await uploadImage(values.img);
            values.img = uploadedImg;
            // img is compulsory while adding place
          } else {
            toast.error("Please upload an image!");
            return;
          }
          // while editing it should not be null because image is compulsory
          // but image can be reuploaded so value.img can have value
        } else if (values.img) {
          const uploadedImg = await uploadImage(values.img);
          values.img = uploadedImg;
          // if image is not reuploaded then just provide the old url
        } else {
          values.img = values.image;
        }

        await mutatePlaces({
          id: placeData.id || null,
          name: values.name,
          description: description,
          image: values.img,
          location: values.location,
          type: values.type,
        });
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, setValues, values }) => (
        <Form>
          <Grid container direction="column" spacing={2}>
            <Grid item mb={3}>
              <Field
                className={classes.textFeildStyles}
                component={TextField}
                variant="outlined"
                name="name"
                type="text"
                label="Name"
              />
            </Grid>

            <Grid item mb={4} xs={12} md={6}>
              <Box mb={1}>
                <InputLabel htmlFor="type">Type</InputLabel>
              </Box>
              <Field
                style={{ height: "2rem" }}
                component={Select}
                name="type"
                inputProps={{
                  id: "place-type",
                }}
                fullWidth
              >
                <MenuItem value="landmark">Landmark</MenuItem>
                <MenuItem value="religious">Religious</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
              </Field>
            </Grid>
            <Grid item mb={3}>
              <Editor {...{description, setDescription}} placeholder="Describe the place according to your experince :)"/>
            </Grid>
            <Grid item mb={4}>
              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item md={4} sm={6} xs={12}>
                  <UploadButton setValues={setValues} values={values} />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <PlacesSearch setLocation={setLocation} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item mb={4}>
              <ContributeMap
                setValues={setValues}
                values={values}
                location={location}
                setLocation={setLocation}
              />
            </Grid>

            {isSubmitting && <LinearProgress />}
            <Grid item mb={2} alignItems="center" xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {placeEdit ? "Update" : "Add"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ContributeForm;
