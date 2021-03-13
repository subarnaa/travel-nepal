import axios from "axios";

const BASE_URL = "/api/user";

export const getUser = async () => {
  const response = await axios.get(BASE_URL, { withCredentials: true });
  return response.data;
};
