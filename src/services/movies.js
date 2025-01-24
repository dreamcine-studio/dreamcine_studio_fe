import API from "../api"

export const getMovies = async () => {
  const { data } = await API.get('/movies')    // ini untuk mengambil data saja
  return data.data
}

export const createMovie = async (data) => {
  try {
    const response = await API.post('/movies', data) // endpoint
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const showMovie = async (id) => {
  try {
    const { data } = await API.get(`/movies/${id}`) // endpoint
    return data.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateMovie = async (id, data) => {
  try {
    const response = await API.post(`/movies/${id}`, data)      // endpoint
    return response.data
} catch (err) {
    console.log(err)
    throw err
}
}

export const deleteMovie = async (id) => {
  try {
    await API.delete(`/movies/${id}`)
    } catch (err) {
      console.log(err)
      throw err
    }
}