import API from "../api"

export const getSchedules = async () => {
  const { data } = await API.get('/schedules' , {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}` 
}})
  return data.data
}

export const createSchedules = async (data) => {
  try {
    const response = await API.post('/schedules', data, {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}` 
  }})
    return response.data
  } catch (error) {
      console.log(error)
      throw error
  }
}

export const updateSchedules = async (id, data) => {
  try {
<<<<<<< HEAD
    const response = await API.post(`/schedules/${id}`, data ,  {
=======
    const response = await API.post(`/schedules/${id}`, data, {
>>>>>>> cdc47d5c47a69dd9f2b16c217a9d4219868bc832
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}` 
  }})
    return response.data
  } catch (error) {
      console.log(error)
      throw error
  }
}

export const deleteSchedules = async (id) => {
  try {
<<<<<<< HEAD
    const { data: response } = await API.delete(`/schedules/${id}` ,  {
=======
    const { response } = await API.delete(`/schedules/${id}`, {
>>>>>>> cdc47d5c47a69dd9f2b16c217a9d4219868bc832
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}` 
  }})
    return response
  } catch (error) {
      console.log(error)
      throw error
  }
}

export const showSchedules = async (id) => {
  try {
    const {data} = await API.get(`/schedules/${id}`)
    return data.data
  } catch (error) {
      console.log(error)
      throw error
  }
}