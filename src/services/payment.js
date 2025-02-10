import API from "../api";

export const getPayments = async () => {
  const { data } = await API.get("/payments", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createPayments = async (data) => {
  try {
    const response = await API.post("/payments", data, {
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

export const updatePayment = async (id, data) => {
  try {
    const response = await API.post(`/payments/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    }); // endpoint
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deletePayment = async (id) => {
  try {
    await API.delete(`/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
