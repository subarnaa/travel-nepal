import axios from "axios";

const BASE_URL = "/api/admin";

export const getAllUser = async () => {
  const response = await axios.get(BASE_URL.concat("/users"), {
    withCredentials: true,
  });
  return response.data;
};

export const getAllPlace = async () => {
  const response = await axios.get(BASE_URL.concat("/places"), {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    BASE_URL.concat(`/users/${id}`),
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const deletePlace = async (id) => {
  const response = await axios.delete(
    BASE_URL.concat(`/places/${id}`),
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateUser = async (data) => {
  const response = await axios.put(
    BASE_URL.concat(`/users/${data.newData.id}`),
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updatePlace = async (data) => {
  const response = await axios.put(
    BASE_URL.concat(`/places/${data.id}`),
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
