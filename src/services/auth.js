import axios from "axios";

const BASE_URL = "/api/auth";

export const loginUser = async (credentials) => {
  const {token, ...rest} = credentials
  const response = await axios.post(BASE_URL.concat("/login"), rest);
  return response.data;
};

export const signupUser = async (credentials) => {
  const { email, password, firstname, lastname } = credentials;
  // const { email, password, firstname, lastname, token } = credentials;
  const response = await axios.post(BASE_URL.concat("/signup"), {
    email,
    password,
    displayName: `${firstname} ${lastname}`,
    // token,
  });
  return response.data;
};

export const requestPassReset = async (credentials) => {
  const response = await axios.post(
    BASE_URL.concat("/password/recover/request"),
    credentials
  );
  return response.data;
};

export const confirmPassReset = async ({ id, credentials }) => {
  const response = await axios.post(
    BASE_URL.concat(`/password/recover/confirm/${id}`),
    credentials
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    BASE_URL.concat("/logout"),
    {},
    { withCredentials: true }
  );
  return response.data;
};
