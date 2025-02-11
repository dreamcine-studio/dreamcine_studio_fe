import { API } from "../api";


export const getGenres = async () => {
  // kita mau destructoring
  const { data } = await API.get("/genres");
  return data.data;
};

//update

// update, kita butuh id dan data

export const updateGenre = async (id, data) => {
  try {
    const response = await API.post(`/genres/${id}`, data, {
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

export const createGenre = async (data) => {
  try {
    const response = await API.post("/genres", data, {
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

export const deleteGenre = async (id) => {
  try {
    await API.delete(`/genres/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
