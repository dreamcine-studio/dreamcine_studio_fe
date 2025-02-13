import { API } from "../api";


export const getScheduleShowtimes = async () => {
  const { data } = await API.get("/scheduleshowtime", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createScheduleShowtimes = async (data) => {
  try {
    const response = await API.post("/scheduleshowtime", data, {
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

export const updateScheduleShowtimes = async (id, data) => {
  try {
    const response = await API.post(`/scheduleshowtime/${id}`, data, {
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

export const deleteScheduleShowtimes = async (id) => {
  try {
    const { data: response } = await API.delete(`/scheduleshowtime/${id}`, {
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

export const showScheduleShowtimes = async (id) => {
  try {
    const { data } = await API.get(`/scheduleshowtime/${id}`, {
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
