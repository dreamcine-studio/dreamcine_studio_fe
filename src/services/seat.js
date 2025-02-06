import API from "../api";

export const getSeats = async () => {
  const { data } = await API.get("/seats", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createSeat = async (data) => {
  try {
    const response = await API.post("/seats", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

<<<<<<< HEAD
export const updateSeat = async (id, data) => {
  try {
    const response = await API.post(`/genres/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
=======
export const showSeat = async (id) => {
  try {
    const { data } = await API.get(`/seats/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },  
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
>>>>>>> f003f4d245f70037b319ed04072a004fe5e80ba8

export const deleteSeat = async (id) => {
  try {
    const { data: response } = await API.delete(`/seats/${id}`, {
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
