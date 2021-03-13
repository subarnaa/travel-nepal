import axios from "axios";

const BASE_URL = "/api/guide";

export const beGuide = async (data) => {
  const response = await axios.post(BASE_URL, data, {
    withCredentials: true,
  });
  return response.data;
};

export const guidePlace = async (id) => {
  const response = await axios.post(
    BASE_URL.concat(`/${id}`),
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const guideOptOut = async (id) => {
  const response = await axios.delete(BASE_URL.concat(`/${id}`), {
    withCredentials: true,
  });
  return response.data;
};
