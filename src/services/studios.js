import API from "../api"

// export const getDatas = async () => {
  // kita ganti menjadi getBooks
export const getStudios = async () => {
  const {data} = await API.get('/studios')
   return data.data
   
 } 




  
 //Create


 export const createStudio = async (data) => {
  try {
    const response = await API.post('/studios', data, {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}` 
       }
    })
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}





//update
  
// update, kita butuh id dan data


   export const updateStudio = async (id, data) => {
    try {
      const response = await API.post(`/studios/${id}`, data, {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}` 
         }
      })
      return response.data
      } catch (err) {
          console.log(err)
          throw err
      }
  }
  



export const deleteStudio = async (id) => {  
  try {
    await API.delete(`/studios/${id}`, {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}` 
       }
    })
    } catch (err) {
      console.log(err)
      throw err
    }
}