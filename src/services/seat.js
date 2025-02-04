import API from "../api";

export const getSeats = async () => {
  const { data } = await API.get("/seats");
  return data.data;
};

export const deleteSeat = async (id) => {
  try {
    await API.delete(`/seats/${id}`); // ini pakai backtick
  } catch (error) {
    console.log(error);
    throw error;
  }
};
