import { API } from "../api";


export const getShowtimes = async () => {
  const { data } = await API.get("/showtimes", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createShowtimes = async (data) => {
  try {
    const response = await API.post("/showtimes", data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateShowtimes = async (id, data) => {
  try {
    const response = await API.post(`/showtimes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteShowtimes = async (id) => {
  try {
    const { data: response } = await API.delete(`/showtimes/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showShowtimes = async (id) => {
  try {
    const { data } = await API.get(`/showtimes/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
