import API from "../api"

export const getSchedules = async () => {
  const { data } = await API.get('/schedules')
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
    const response = await API.post(`/schedules/${id}`, data)
    return response.data
  } catch (error) {
      console.log(error)
      throw error
  }
}

export const deleteSchedules = async (id) => {
  try {
    const { data: response } = await API.delete(`/schedules/${id}`)
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