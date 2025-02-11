import { API } from "../api";


export const getPaymentmethods = async () => {
  const { data } = await API.get("/payment_methods");
  return data.data;
};


export const createPaymentmethod = async (data) => {
  try {
    const response = await API.post("/payment_methods", data, {
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


export const updatePaymentmethod = async (data) => {
  try {
    const response = await API.post("/payment_methods", data, {
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



export const deletePaymentmethod = async (id) => {
  try {
    await API.delete(`/payment_methods/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
