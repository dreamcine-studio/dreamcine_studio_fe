import API from "../api";

export const getMovies = async () => {
  const { data } = await API.get("/movies");
  return data.data;
};

export const createMovie = async (data) => {
  try {
    const response = await API.post("/movies", data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const showMovie = async (id) => {
  try {
    const { data } = await API.get(`/movies/${id}`); // endpoint
    return data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateMovie = async (id, data) => {
  try {
    const response = await API.post(`/movies/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteMovie = async (id) => {
  try {
    await API.delete(`/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
