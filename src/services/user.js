import { API } from "../api";

export const getUsers = async () => {
  try {
    const { data } =  await API.get(`/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteUsers = async (id) => {
  try {
    await API.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
