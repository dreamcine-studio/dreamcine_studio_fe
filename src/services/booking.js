import API from "../api";

export const getBookings = async () => {
  const { data } = await API.get('/booking')
  return data.data;
} 


export const createBookings = async (data) => {
    try {
      const response = await API.post('/bookings', data)
      return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
  }
  
  export const updateBookings = async (id, data) => {
    try {
      const response = await API.post(`/bookings/${id}`, data)
      return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
  }
  
  export const deleteBookings = async (id) => {
    try {
      const { data: response } = await API.delete(`/bookings/${id}`)
      return response
    } catch (error) {
        console.log(error)
        throw error
    }
  }
  
  export const showBook = async (id) => {
    try {
      const {data} = await API.get(`/books/${id}`)
      return data.data
    } catch (error) {
        console.log(error)
        throw error
    }
  }