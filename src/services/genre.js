import API from "../api"

export const getGenres = async () => {
  // kita mau destructoring
  const { data } = await API.get('/genres')
   return data.data
   
 } 

 export const deleteGenre = async(id) => {
  try{
    await API.delete(`/genres/${id}`)      // ini pakai backtick
  }catch (error){
    console.log(error)
    throw error
  }
}


//update
  
// update, kita butuh id dan data
export const updateGenre = async (id, data) =>{
  try { 
     const response = await API.post(`/genres/${id}`, data)  // endpoints
     return response.data.data;
  }catch (err){
     console.log(err)
     throw err
  }
 }


 //Create
  
 export const createGenre = async(data) =>
  {
 
     try{
       const response  = await API.post(`/genres`, data)  // endpoint
       return response.data;
     }catch(error) {
       console.log(error);
       throw error
     }
  }  