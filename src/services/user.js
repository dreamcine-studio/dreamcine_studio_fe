import API from "../api";

export const getUsers = async () => {
  const { data } = await API.get("/users");
  return data.data;
};