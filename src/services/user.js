import { API } from "../api";

export const getUsers = async () => {
  const { data } = await API.get("/users");
  return data.data;
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
