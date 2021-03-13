import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
// import { useRef } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../user-contex";
import * as yup from "yup";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";

import { loginUser } from "../services/auth";

const validator = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const formInitValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  // const reRef = useRef();
  const history = useHistory();
  const [, userDispatch] = useAuth();
  const [mutateLoginUser] = useMutation(loginUser, {
    onSuccess: (data) => {
      userDispatch({ type: "login", payload: { user: data } });
      history.push("/");
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
      initialValues={formInitValues}
      validationSchema={validator}
      onSubmit={async (values, { setSubmitting }) => {
        // const token = await reRef.current.executeAsync();
        // reRef.current.reset();
        // await mutateLoginUser({ ...values, token });
        await mutateLoginUser({ ...values});
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container direction="column" spacing={2}>
            <Grid item mb={3} xs={12}>
              <Field
                component={TextField}
                variant="outlined"
                name="email"
                type="email"
                label="Email"
                fullWidth
              />
            </Grid>
            <Grid item mb={3}>
              <Field
                component={TextField}
                variant="outlined"
                type="password"
                label="Password"
                name="password"
                fullWidth
              />
            </Grid>

            {isSubmitting && <LinearProgress />}

            <Grid item mb={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Continue
              </Button>
            </Grid>
            {/* <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA}
              size="invisible"
              ref={reRef}
            /> */}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
