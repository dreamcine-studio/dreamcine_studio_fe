import API from "../api";

export const getSeats = async () => {
  const { data } = await API.get("/seats");
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

export const deleteSeat = async (id) => {
  try {
    await API.delete(`/seats/${id}`); // ini pakai backtick
  } catch (error) {
    console.log(error);
    throw error;
  }
};
