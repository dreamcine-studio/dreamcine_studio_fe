import API from "../api";

export const getBooking = async () => {
  const { data } = await API.get("/bookings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createBooking = async (data) => {
  try {
    const response = await API.post("/bookings", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showBooking = async (id) => {
  try {
    const { data } = await API.get(`/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }); // endpoint
    return data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateBooking = async (id, data) => {
  try {
    const response = await API.post(`/bookings/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const { data: response } = await API.delete(`/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
