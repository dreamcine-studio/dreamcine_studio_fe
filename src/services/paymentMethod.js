import API from "../api";

export const getPaymentmethods = async () => {
  const { data } = await API.get("/payment_methods");
  return data.data;
};

export const createPaymentmethod = async (data) => {
  try {
    const response = await API.post("/payment_methods", data); // endpoint
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updatePaymentmethod = async (id, data) => {
  try {
    const response = await API.post(`/payment_methods/${id}`, data); // endpoint
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deletePaymentmethod = async (id) => {
  try {
    await API.delete(`/payment_methods/${id}`); // ini pakai backtick
  } catch (error) {
    console.log(error);
    throw error;
  }
};
