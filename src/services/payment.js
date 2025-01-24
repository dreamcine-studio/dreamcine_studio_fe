import API from "../api";

export const getPayments = async () => {
    const {data} = await API.get('/payments')
    return data.data;
  } 
  
  export const updatePayment= async (id,data) => {
      try {
          const response = await API.post(`/payments/${id}`,data) // endpoint
          return response.data
      }   catch (err) {
          console.log(err);
          throw err
      }
  }
  
  export const deletePayment = async(id) => {
    try{
      await API.delete(`/payments/${id}`)      // ini pakai backtick
    }catch (error){
      console.log(error)
      throw error
    }
  }