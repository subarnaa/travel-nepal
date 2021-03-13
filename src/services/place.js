import axios from "axios";

const BASE_URL = "/api/places";

export const addPlace = async (placeInfo) => {
  const { id, ...placeToAdd } = placeInfo;
  const response = await axios.post(BASE_URL, placeToAdd, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllPlaces = async () => {
  const response = await axios.get(BASE_URL, {
    withCredentials: true,
  });
  return response.data;
};

export const getPlaceDetail = async (_key, id) => {
  const response = await axios.get(BASE_URL.concat(`/${id}`), {
    withCredentials: true,
  });
  return response.data;
};

export const makeReview = async (data) => {
  const { id, review } = data;
  const response = await axios.post(BASE_URL.concat(`/${id}/reviews`), review, {
    withCredentials: true,
  });
  return response.data;
};

export const getEditorChoice = async () => {
  const response = await axios.get(BASE_URL.concat("/editor"), {
    withCredentials: true,
  });
  return response.data;
};

export const getBestDestinations = async () => {
  const response = await axios.get(BASE_URL.concat("/top"), {
    withCredentials: true,
  });
  return response.data;
};

export const getPlaceByQuery = async (_id, query) => {
  console.log(query);
  const response = await axios.get(BASE_URL.concat(`?keyword=${query}`), {
    withCredentials: true,
  });
  return response.data;
};

export const editReview = async (data) => {
  const { id, review } = data;
  const response = await axios.put(BASE_URL.concat(`/${id}/reviews`), review, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await axios.delete(BASE_URL.concat(`/${id}/reviews`), {
    withCredentials: true,
  });
  return response.data;
};

export const deletePlace = async (id) => {
  const response = await axios.delete(BASE_URL.concat(`/${id}`), {
    withCredentials: true,
  });
  return response.data;
};

export const editPlace = async (placeInfo) => {
  const { id, ...placeToEdit } = placeInfo;
  const response = await axios.put(BASE_URL.concat(`/${id}`), placeToEdit, {
    withCredentials: true,
  });
  return response.data;
};
