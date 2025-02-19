import { API } from "../api";


export const getScheduleShowtimes = async () => {
  const { data } = await API.get("/scheduleshowtimes", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createScheduleShowtimes = async (data) => {
  try {
    const response = await API.post("/scheduleshowtimes", data, {
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
    const response = await API.post(`/scheduleshowtimes/${id}`, data, {
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
    const { data: response } = await API.delete(`/scheduleshowtimes/${id}`, {
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
    const { data } = await API.get(`/scheduleshowtimes/${id}`, {
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
