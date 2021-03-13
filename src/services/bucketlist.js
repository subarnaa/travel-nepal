import axios from "axios";

const BASE_URL = "/api/buckets";

export const getAllBucketList = async () => {
  const response = await axios.get(BASE_URL, {
    withCredentials: true,
  });
  return response.data;
};

export const addPlaceToBucketList = async (id) => {
  const response = await axios.post(
    BASE_URL.concat(`/${id}`),
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const removePlaceFromBucketList = async (id) => {
  const response = await axios.delete(
    BASE_URL.concat(`/${id}`),
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateBucketItem = async (data) => {
  const { id, status } = data;
  const response = await axios.put(
    BASE_URL.concat(`/${id}`),
    { status },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
